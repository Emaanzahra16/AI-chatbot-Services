"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const trust = [
  { icon: Clock, text: "Primer agente en 15 días" },
  { icon: Shield, text: "100% GDPR · EU-hosted" },
  { icon: Gift, text: "Demo gratuita sin compromiso" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-sm text-violet-400 mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Barcelona · Disponible en remoto</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-white">Tu negocio,</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-violet-500 to-plasma-400 bg-clip-text text-transparent">
              potenciado por IA
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-ink-300 max-w-2xl mx-auto"
          >
            Implementamos chatbots IA, flujos de automatización y webs de alta 
            conversión para que tu empresa trabaje de forma más inteligente — 
            sin necesidad de conocimientos técnicos.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-ink-400"
          >
            {trust.map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <t.icon className="w-4 h-4 text-violet-400" />
                {t.text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-8"
              >
                Demo gratuita en 30 min
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#services">
              <Button
                size="lg"
                variant="outline"
                className="border-ink-700 text-ink-300 hover:bg-ink-800/50"
              >
                Ver qué hacemos
              </Button>
            </Link>
          </motion.div>

          {/* Value props — no fake numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-ink-800 pt-8"
          >
            {[
              { val: "15 días", label: "Entrega del primer agente" },
              { val: "24/7",    label: "Tu negocio sin parar" },
              { val: "100%",    label: "Personalizado para ti" },
            ].map((s) => (
              <div key={s.val}>
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-sm text-ink-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
