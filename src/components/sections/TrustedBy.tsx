"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { emoji: "🎯", text: "Acceso prioritario a nuevas funcionalidades" },
  { emoji: "💰", text: "Precio de lanzamiento exclusivo para early adopters" },
  { emoji: "🤝", text: "Sesiones de co-desarrollo con el equipo fundador" },
  { emoji: "📊", text: "Resultados medibles desde la primera semana" },
];

export function TrustedBy() {
  return (
    <section className="py-14 border-y border-ink-800/50 bg-ink-900/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm text-violet-400 mb-4">
            <Rocket className="w-4 h-4" /> Programa early adopter — plazas limitadas
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3">
            Sé uno de nuestros primeros clientes
          </h2>
          <p className="text-ink-300 mb-8">
            Estamos arrancando y buscamos empresas que quieran crecer con nosotros.
            A cambio de ser de los primeros, obtienes condiciones únicas que no volverán.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 text-left max-w-lg mx-auto">
            {perks.map((p) => (
              <div key={p.text} className="flex items-start gap-2 text-sm text-ink-300">
                <span className="text-base flex-shrink-0">{p.emoji}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <Link href="/contact">
            <Button className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white">
              Quiero ser early adopter
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
