"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, CheckCircle, Mail, Phone, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("¡Formulario enviado! Te contactaremos en 24h.");
      } else {
        toast.error("Error al enviar. Inténtalo de nuevo.");
      }
    } catch (error) {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ¡Gracias por contactarnos!
          </h1>
          <p className="text-ink-300">
            Hemos recibido tu solicitud. Te responderemos en menos de 24 horas 
            para coordinar tu demo gratuita.
          </p>
          <Link href="/">
            <Button
              variant="outline"
              className="mt-6 border-ink-700 text-ink-300 hover:bg-ink-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-flex items-center text-ink-400 hover:text-white transition mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Hablemos de tu proyecto
            </h1>
            <p className="text-ink-300 mt-2 max-w-2xl mx-auto">
              Analizamos tu caso en 30 minutos y te decimos qué procesos 
              automatizar primero, cuánto puede costar y cuánto puedes ahorrar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-ink-300 block mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-ink-900/50 border border-ink-700 text-white focus:border-violet-500 focus:outline-none transition"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-ink-300 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-ink-900/50 border border-ink-700 text-white focus:border-violet-500 focus:outline-none transition"
                    placeholder="tu@empresa.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-ink-300 block mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-ink-900/50 border border-ink-700 text-white focus:border-violet-500 focus:outline-none transition"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-ink-300 block mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-ink-900/50 border border-ink-700 text-white focus:border-violet-500 focus:outline-none transition"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-ink-300 block mb-1">
                    ¿Qué necesitas automatizar?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-ink-900/50 border border-ink-700 text-white focus:border-violet-500 focus:outline-none transition resize-none"
                    placeholder="Cuéntanos qué procesos te gustaría automatizar con IA..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar demo gratuita"}
                </Button>
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700">
                <h3 className="text-white font-semibold mb-4">
                  ¿Qué incluye la demo?
                </h3>
                <ul className="space-y-3 text-sm text-ink-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Identificamos los 3 procesos con mayor potencial de automatización</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Estimamos el ROI y el tiempo de implementación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Te entregamos una propuesta detallada sin compromiso</span>
                  </li>
                </ul>
              </div>

              <div className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700">
                <h3 className="text-white font-semibold mb-4">
                  También puedes contactarnos por
                </h3>
                <a href="https://wa.me/+34624280211" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full border-ink-700 text-ink-300 hover:bg-ink-800/50 gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href="mailto:ai.servicios.chatbot@gmail.com">
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-ink-700 text-ink-300 hover:bg-ink-800/50 gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    ai.servicios.chatbot@gmail.com
                  </Button>
                </a>
                <a href="tel:+34624280211">
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-ink-700 text-ink-300 hover:bg-ink-800/50 gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    +34 624 280 211
                  </Button>
                </a>
              </div>

              <div className="text-center text-xs text-ink-500">
                <p>Respuesta en menos de 24h · Sin compromiso</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}