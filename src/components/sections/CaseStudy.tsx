"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const examples = [
  {
    sector: "⚖️ Despacho jurídico",
    problem: "50+ consultas semanales cualificadas manualmente. Socios perdiendo horas en tareas administrativas.",
    solution: "Agente IA con RAG que cualifica leads, filtra por área jurídica, crea expedientes en el CRM y programa reuniones automáticamente.",
    outcomes: ["-45% tiempo administrativo", "+38% tasa de conversión", "Atención 24/7 sin operador humano"],
  },
  {
    sector: "🛒 E-commerce",
    problem: "Miles de mensajes de clientes sobre pedidos, devoluciones y disponibilidad de producto sin equipo de soporte suficiente.",
    solution: "Chatbot conectado al sistema de pedidos que responde en tiempo real, gestiona devoluciones y escala a humano solo cuando es necesario.",
    outcomes: ["80% consultas resueltas sin humano", "Respuesta < 10 segundos", "Soporte en múltiples idiomas"],
  },
];

export function CaseStudy() {
  return (
    <section id="case-studies" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Proyectos tipo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Lo que construimos para nuestros clientes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-ink-300 max-w-2xl mx-auto"
          >
            Ejemplos representativos de los proyectos que desarrollamos. 
            Cuéntanos tu caso y te diremos qué podemos hacer por ti.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700 hover:border-violet-500/30 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{ex.sector}</h3>

              <div className="space-y-4 mb-6">
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <p className="text-xs text-red-400 font-semibold uppercase mb-1">El problema</p>
                  <p className="text-sm text-ink-300">{ex.problem}</p>
                </div>
                <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
                  <p className="text-xs text-violet-400 font-semibold uppercase mb-1">Nuestra solución</p>
                  <p className="text-sm text-ink-300">{ex.solution}</p>
                </div>
              </div>

              <div className="space-y-2">
                {ex.outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2 text-sm text-ink-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    {o}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white">
              ¿Tu caso encaja? Hablemos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
