"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  PenTool, 
  Code2, 
  Rocket, 
  BarChart, 
  Zap 
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Demo gratuita",
    description: "Llamada de 30 minutos. Identificamos los 3 procesos con mayor potencial de automatización en tu empresa.",
    duration: "Día 1",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Hoja de ruta",
    description: "Entregamos un plan concreto con prioridades, costes estimados y plazos. Sin compromiso previo.",
    duration: "Día 3",
  },
  {
    number: "03",
    icon: Code2,
    title: "Primer sprint",
    description: "Implementamos el primer agente o automatización. Tu equipo lo prueba en condiciones reales.",
    duration: "Día 15",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Despliegue en producción",
    description: "Lanzamos el agente en tu entorno real con monitoreo y soporte continuo durante 30 días.",
    duration: "Día 21",
  },
  {
    number: "05",
    icon: BarChart,
    title: "Medición de resultados",
    description: "Entregamos dashboards con KPIs reales: tickets resueltos, leads cualificados, tiempo ahorrado.",
    duration: "Día 30",
  },
  {
    number: "06",
    icon: Zap,
    title: "Transferencia de conocimiento",
    description: "Formamos a tu equipo para que gestione y mejore los agentes. Sin dependencia técnica.",
    duration: "Día 45",
  },
];

export function Process() {
  return (
    <section className="py-20 md:py-28 bg-ink-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Cómo trabajamos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            De la idea al agente en producción en 15 días
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/30 via-plasma-500/30 to-transparent -translate-x-1/2" />

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex ${isEven ? "lg:pr-12" : "lg:pl-12"} ${
                    isEven ? "lg:text-right lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Number badge */}
                  <div className={`
                    flex-shrink-0 w-12 h-12 rounded-full 
                    bg-gradient-to-br from-violet-500 to-plasma-500 
                    flex items-center justify-center font-bold text-white
                    ${isEven ? "lg:ml-6" : "lg:mr-6"}
                  `}>
                    {step.number}
                  </div>

                  <div className={`flex-1 ${isEven ? "lg:pr-4" : "lg:pl-4"}`}>
                    <div className="bg-ink-800/30 rounded-2xl p-6 border border-ink-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-5 h-5 text-violet-400" />
                        <h3 className="text-lg font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-ink-300 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-3 text-xs text-violet-400 font-medium">
                        ⌛ {step.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}