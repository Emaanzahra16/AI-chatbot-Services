"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";

const results = [
  {
    icon: TrendingUp,
    label: "Aumento de conversión",
    value: "+38%",
    description: "leads cualificados en legal tech",
  },
  {
    icon: Clock,
    label: "Reducción de tiempo",
    value: "-72%",
    description: "en onboarding de clientes fintech",
  },
  {
    icon: Users,
    label: "Automatización",
    value: "80-90%",
    description: "de consultas resueltas sin intervención",
  },
  {
    icon: Zap,
    label: "Velocidad",
    value: "24/7",
    description: "atención sin operador humano nocturno",
  },
];

export function Results() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Resultados reales
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Lo que nuestros clientes están consiguiendo
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700 text-center group hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-500/20 transition">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {result.value}
                </div>
                <div className="text-sm font-medium text-ink-300 mt-1">
                  {result.label}
                </div>
                <div className="text-xs text-ink-400 mt-1">
                  {result.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-ink-400">
            Basado en datos reales de clientes en fintech, legal tech, inmobiliario y consultoría.
          </p>
        </motion.div>
      </div>
    </section>
  );
}