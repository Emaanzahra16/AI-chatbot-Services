'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PHONE   = '34624280211';
const MESSAGE = encodeURIComponent(
  'Hola, quiero un demo gratuita de IA para mi empresa'
);
const WA_URL  = `https://wa.me/${PHONE}?text=${MESSAGE}`;

const WA_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Professional automated reply message shown in the chat preview
const AUTO_REPLY = `¡Hola! 👋 Gracias por contactar con AI Services.

Somos especialistas en implementación de Inteligencia Artificial para empresas en Barcelona y toda España.

Para preparar tu demo gratuita personalizado, necesitamos algunos datos:

📋 Tu nombre y cargo
🏢 Nombre y sector de tu empresa
🎯 El principal reto que quieres resolver con IA
📅 Tu disponibilidad para una llamada de 30 min

Un especialista de nuestro equipo te responderá en menos de 2 horas (L–V, 9:00–18:00 CET).

¡Estamos deseando conocer tu proyecto! 🚀`;

export function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Don't re-show if the user already dismissed it this session
    if (sessionStorage.getItem('wa-dismissed')) return;
    const t = setTimeout(() => setShowBubble(true), 4_000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    sessionStorage.setItem('wa-dismissed', '1');
  };

  return (
    <>
      {/* ── Chat preview bubble ───────────────────────────────────────── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-[4.5rem] left-4 z-50 w-[22rem] overflow-hidden rounded-2xl shadow-2xl sm:bottom-[5.5rem] sm:left-7"
          >
            {/* WhatsApp-style header */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#25D366]">
                {WA_ICON}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">AI Services</p>
                <p className="text-xs text-[#25D366]">● En línea · Responde rápido</p>
              </div>
              <button
                onClick={dismiss}
                aria-label="Cerrar"
                className="ml-auto rounded-full p-1 text-white/60 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat body */}
            <div className="bg-[#E5DDD5] px-4 py-4">
              {/* Timestamp */}
              <p className="mb-2 text-center text-[10px] text-[#888]">Hoy</p>

              {/* Message bubble (left = incoming) */}
              <div className="relative max-w-[90%] rounded-xl rounded-tl-none bg-white px-3.5 py-3 shadow-sm">
                {/* WhatsApp bubble tail */}
                <span
                  aria-hidden
                  className="absolute -left-2 top-0 h-0 w-0"
                  style={{
                    borderTop: '0 solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid white',
                  }}
                />
                <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#303030]">
                  {AUTO_REPLY}
                </p>
                <p className="mt-1.5 text-right text-[10px] text-[#8D8D8D]">
                  AI Services ✓✓
                </p>
              </div>
            </div>

            {/* CTA button */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowBubble(false)}
              className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5a] active:bg-[#179a48]"
            >
              {WA_ICON}
              Iniciar conversación en WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button (always visible, bottom LEFT) ────────────── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowBubble(false)}
        aria-label="Contáctanos por WhatsApp"
        title="WhatsApp"
        className="group fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-green-500/30 transition-all hover:scale-105 hover:bg-[#1ebe5a] hover:shadow-green-500/50 sm:bottom-7 sm:left-7"
      >
        {WA_ICON}
        <span className="text-sm font-medium">WhatsApp</span>
      </a>
    </>
  );
}
