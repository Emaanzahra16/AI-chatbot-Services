"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-violet-500/10 to-plasma-500/10 rounded-3xl p-8 md:p-12 border border-violet-500/20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para automatizar tu empresa?
          </h2>
          <p className="text-ink-300 text-lg max-w-2xl mx-auto mb-8">
            Analizamos tu caso en 30 minutos y te decimos qué procesos automatizar 
            primero, cuánto puede costar y cuánto puedes ahorrar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-8"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Demo gratuita
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="https://wa.me/+34624280211" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="border-ink-700 text-ink-300 hover:bg-ink-800/50"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Escríbenos por WhatsApp
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-ink-400">
            <span>✓ 30 minutos sin compromiso</span>
            <span>✓ Propuesta detallada en 24h</span>
            <span>✓ Primer agente en 15 días</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}