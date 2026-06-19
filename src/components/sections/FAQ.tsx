"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta implementar IA para mi empresa?",
    answer: "El precio depende del alcance: complejidad del chatbot, número de integraciones y páginas web. Cada proyecto es único, por eso no tenemos tarifas fijas publicadas — así evitamos cobrarte por lo que no necesitas. Solicita tu demo gratuita y recibirás un presupuesto detallado en menos de 24 horas, sin compromiso."
  },
  {
    question: "¿Cuánto tiempo tarda en estar listo el primer agente?",
    answer: "El primer prototipo funcional está operativo en menos de 15 días desde el inicio del proyecto. En la semana 1 completamos el análisis inicial, definimos la base de conocimiento y configuramos la arquitectura. En la semana 2 entrenamos el agente con tus datos reales y lo conectamos a tus sistemas."
  },
  {
    question: "¿Qué sectores atendéis en Barcelona?",
    answer: "Trabajamos principalmente con fintech, legal tech, startups, consultoría, inmobiliario, sector público y salud privada. Tenemos experiencia específica en cada sector y adaptamos la arquitectura del agente a la realidad operativa de cada uno."
  },
  {
    question: "¿Los datos de mi empresa están seguros?",
    answer: "Absolutamente. Usamos infraestructura 100% EU-hosted, cumplimos con GDPR y firmamos NDAs. Tus datos nunca salen del territorio europeo y no se usan para entrenar modelos sin tu consentimiento explícito."
  },
  {
    question: "¿Puedo integrar el agente con mis herramientas actuales?",
    answer: "Sí. Conectamos con HubSpot, Salesforce, Intercom, Slack, Notion, Google Workspace, y prácticamente cualquier herramienta que tenga API. La integración forma parte del alcance estándar de todos nuestros proyectos."
  },
  {
    question: "¿Qué pasa si el agente no sabe responder algo?",
    answer: "El agente está diseñado para reconocer sus límites. Cuando no puede resolver algo, escala automáticamente a un humano con todo el contexto de la conversación, sin que el cliente tenga que repetir nada."
  },
  {
    question: "¿Ofrecéis reuniones presenciales en Barcelona?",
    answer: "Trabajamos en remoto con la misma efectividad que si estuviéramos en tu oficina. Para proyectos de mayor envergadura o fases de kick-off, podemos organizar jornadas presenciales en Barcelona bajo acuerdo previo."
  },
  {
    question: "¿Hay permanencia mínima?",
    answer: "No. Nuestros proyectos son a precio fijo sin permanencia. Si no ves resultados en el primer mes, podemos cancelar sin penalización. La confianza se construye con resultados, no con contratos."
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            Preguntas frecuentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Todo lo que necesitas saber
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-ink-800/30 transition-colors"
                >
                  <span className="text-sm md:text-base font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-400 transition-transform flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-sm text-ink-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}