"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Globe, Plug } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Custom AI Chatbots",
    description: "Asistentes inteligentes entrenados con los datos de tu empresa para atender clientes 24/7, responder preguntas y cualificar leads automáticamente.",
    tags: ["Atención al cliente", "Ventas", "RRHH"],
  },
  {
    icon: Cpu,
    title: "AI Agent Workflows",
    description: "Trabajadores digitales autónomos que automatizan entrada de datos, cualificación de leads, agendado de reuniones y tareas repetitivas de back-office.",
    tags: ["Automatización", "Lead gen", "Operaciones"],
  },
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Webs de alta conversión construidas desde cero para convertir visitas en clientes. Rápidas, bonitas y optimizadas para vender.",
    tags: ["Landing pages", "Corporativas", "E-commerce"],
  },
  {
    icon: Plug,
    title: "AI Integration",
    description: "Conectamos herramientas de IA con tu CRM, WhatsApp, email o sistemas existentes para que todo funcione como un único ecosistema inteligente.",
    tags: ["CRM", "WhatsApp", "APIs"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Todo lo que necesitas para empezar con IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-ink-300"
          >
            Desde el chatbot hasta la web, lo construimos todo. Sin agencias externas, 
            sin subcontratas — nuestro equipo de principio a fin.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-ink-800/30 rounded-2xl p-6 border border-ink-700 hover:border-violet-500/30 transition-all hover:bg-ink-800/50"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-ink-700/50 text-ink-400 border border-ink-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
