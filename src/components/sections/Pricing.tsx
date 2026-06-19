"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    tagline: "Perfecto para empezar con IA",
    features: [
      "1 agente conversacional",
      "RAG con tu base de conocimiento",
      "Integración con 1 herramienta (CRM/email)",
      "Formación básica del equipo",
      "30 días de soporte post-lanzamiento",
    ],
    cta: "Solicitar propuesta",
    featured: false,
  },
  {
    name: "Pro",
    tagline: "Para equipos que quieren escalar",
    features: [
      "3 agentes conversacionales",
      "RAG avanzado + memoria persistente",
      "Integración con 5+ herramientas",
      "Automatizaciones con n8n",
      "Dashboards de analítica personalizados",
      "Formación avanzada + documentación",
      "90 días de soporte post-lanzamiento",
    ],
    cta: "Solicitar propuesta",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "Solución completa a medida",
    features: [
      "Agentes ilimitados",
      "Modelos privados fine-tuned",
      "Infraestructura dedicada (on-premise / VPC)",
      "SOC 2 Type II · HIPAA · GDPR",
      "SSO/SAML + audit logs",
      "Soporte 24/7 con equipo dedicado",
    ],
    cta: "Contactar comercial",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Planes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Soluciones para cada etapa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-ink-300"
          >
            Cada proyecto es único. Solicita tu demo gratuita y recibe un presupuesto 
            personalizado sin compromiso.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border transition-all ${
                plan.featured
                  ? "bg-gradient-to-br from-violet-500/10 to-plasma-500/10 border-2 border-violet-500/30"
                  : "bg-ink-800/30 border-ink-700 hover:border-violet-500/30"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-plasma-500 text-xs font-bold text-white">
                  MÁS POPULAR
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mt-2">{plan.name}</h3>
              <p className="text-sm text-ink-400 mt-1 mb-5">{plan.tagline}</p>

              <ul className="space-y-3 text-sm mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className={`w-full ${
                    plan.featured
                      ? "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white"
                      : "border-ink-700 text-ink-300 hover:bg-ink-800/50"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 text-center max-w-2xl mx-auto bg-ink-800/20 rounded-2xl p-6 border border-ink-700"
        >
          <p className="text-sm text-ink-300">
            <span className="font-semibold text-white">¿No estás seguro por dónde empezar?</span>{" "}
            Reserva una demo gratuita de 30 minutos y te mostraremos exactamente qué 
            procesos automatizar primero y qué resultados puedes esperar.
          </p>
          <Link href="/contact">
            <Button variant="link" className="text-violet-400 hover:text-violet-300 mt-2">
              Reserva tu demo gratuita →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
