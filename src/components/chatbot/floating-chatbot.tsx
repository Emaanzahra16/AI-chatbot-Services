'use client';

import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
} from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Minimize2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PulseDot } from '@/components/ui/badge';
import type { ChatMessage } from '@/types';

const DISABLED_PATHS = ['/dashboard'];

const WA = 'https://wa.me/34624280211?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20vuestros%20servicios';
const WA_LINK = `📲 [Chatea con nosotros en WhatsApp](${WA}) para más detalles.`;

/* ─── Hardcoded Q&A ─────────────────────────────────────────────────────── */

const QA: Array<{ match: RegExp; answer: string }> = [
  {
    match: /service|servicio|offer|ofre[sc]|what.*do.*you|qué.*hacen|que.*hacen/i,
    answer: `Estos son nuestros servicios:\n\n• 🤖 **Custom AI Chatbots** — Asistentes inteligentes entrenados con los datos de tu empresa para atender clientes 24/7.\n• ⚙️ **AI Agent Workflows** — Trabajadores digitales autónomos que automatizan entrada de datos, calificación de leads y agendado.\n• 🌐 **Web Design & Development** — Webs de alta conversión construidas desde cero para convertir visitas en clientes.\n• 🔗 **AI Integration** — Conectamos herramientas de IA con tu CRM, WhatsApp o sistemas de email existentes.\n\n${WA_LINK}`,
  },
  {
    match: /cost|price|pricing|cuánto|cuanto|precio|presupuesto|how much|paga|cob[ra]/i,
    answer: `Así funciona nuestro modelo de precios:\n\n• 💼 **Sin precio fijo** — Cada empresa recibe una solución completamente personalizada según su workflow.\n• 📋 **Presupuesto según alcance** — El precio depende de la complejidad del chatbot, las integraciones y el número de páginas.\n• 📈 **Opciones flexibles** — Desde sitios informativos simples hasta ecosistemas multi-agente avanzados.\n• 🎁 **Estimación gratuita** — Recibes un desglose de costes detallado tras tu demo gratuita, sin compromiso.\n\n${WA_LINK}`,
  },
  {
    match: /contact|contacto|reach|email|phone|teléfono|hablar|speak|talk|get in touch/i,
    answer: `Puedes contactarnos de varias formas:\n\n• 📅 **Reservar demo** — Usa nuestro calendario online para elegir un horario de videollamada.\n• 📧 **Email directo** — ai.servicios.chatbot@gmail.com\n• 💬 **Este chatbot** — ¡Pregúntame lo que necesites ahora mismo!\n• 📝 **Formulario** — Deja tu nombre y detalles en nuestra página de contacto.\n\n${WA_LINK}`,
  },
  {
    match: /ai agent|agente ia|agente de ia|what is.*agent|qué es.*agente|que es.*agente|how.*agent.*work/i,
    answer: `Excelente pregunta. Un Agente IA es:\n\n• ⚡ **Software orientado a la acción** — A diferencia de los bots básicos que solo hablan, los agentes ejecutan tareas digitales reales.\n• 🧠 **Resolutores autónomos** — Analizan un objetivo, planifican los pasos y los ejecutan sin intervención humana.\n• 🛠️ **Usuarios de herramientas** — Pueden leer bases de datos, enviar emails, actualizar hojas de cálculo y navegar la web.\n• 👥 **Empleados digitales** — Funcionan como miembros del equipo virtuales que gestionan operaciones repetitivas en segundo plano.\n\n${WA_LINK}`,
  },
];

const FALLBACK = `Gracias por tu mensaje. Para darte la mejor respuesta, ¡ponte en contacto con nuestro equipo directamente!\n\n${WA_LINK}`;

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: '¡Hola! 👋 Soy el asistente de AI Services. Puedo responder a tus preguntas sobre nuestros servicios, precios y cómo contactarnos. ¿En qué te puedo ayudar?',
  createdAt: new Date().toISOString(),
};

const SUGGESTIONS = [
  '¿Qué servicios ofrecen?',
  '¿Cuánto cuesta un proyecto?',
  '¿Cómo puedo contactar?',
  '¿Qué es un agente IA?',
];

function getAnswer(input: string): string {
  const found = QA.find((q) => q.match.test(input));
  return found ? found.answer : FALLBACK;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function FloatingChatbot() {
  const pathname = usePathname();
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [showSugg, setShowSugg]   = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const hidden = DISABLED_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setShowSugg(false);
    setInput('');

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate brief "typing" delay for natural feel
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'assistant',
          content: getAnswer(trimmed),
          createdAt: new Date().toISOString(),
        },
      ]);
    }, 700);
  }

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); sendMessage(input); };

  const reset = () => { setMessages([WELCOME]); setShowSugg(true); setInput(''); };

  if (hidden) return null;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            aria-label="Abrir asistente"
            className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl shadow-violet-500/40 sm:bottom-7 sm:right-7"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}
          >
            <span aria-hidden className="absolute inset-0 -z-10 animate-pulse rounded-full opacity-60" style={{ background: 'inherit', filter: 'blur(20px)' }} />
            <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-[#06081a] bg-cyan-400 text-[10px] font-bold text-[#06081a]">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100vh-1rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#06081a]/90 shadow-2xl shadow-violet-500/20 backdrop-blur-2xl sm:bottom-7 sm:right-7 sm:left-auto sm:h-[580px] sm:w-[400px]"
          >
            {/* Aurora bg */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(ellipse at 20% 20%,rgba(124,58,237,.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(6,182,212,.1) 0%,transparent 60%)' }} />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 bg-[#06081a]/60 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#06081a] bg-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">AI Services</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <PulseDot /> En línea · responde al instante
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} title="Reiniciar" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button onClick={() => setOpen(false)} title="Minimizar" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition">
                  <Minimize2 className="h-4 w-4 hidden sm:block" />
                  <X className="h-4 w-4 sm:hidden" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m) => <Bubble key={m.id} message={m} />)}

              {typing && (
                <div className="flex gap-2.5">
                  <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-3.5 py-3">
                    <span className="inline-flex items-center gap-1">
                      {[0,1,2].map((i) => (
                        <span key={i} className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"
                          style={{ animation: `bounce 1s ${i*0.15}s infinite` }} />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {/* Suggestion chips */}
              {showSugg && messages.length === 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => sendMessage(s)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-white/10 bg-[#06081a]/60 p-3 backdrop-blur">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta…" disabled={typing}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-50" />
                <button type="submit" disabled={!input.trim() || typing}
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white transition hover:opacity-80 disabled:opacity-40">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-slate-600">AI Services · Barcelona</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Bubble ──────────────────────────────────────────────────────────────── */

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  // Render markdown-like bold (**text**) and links ([text](url))
  function renderContent(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g);
    return parts.map((part, i) => {
      if (part === '\n') return <br key={i} />;
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch)
        return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
          className="underline text-cyan-400 hover:text-cyan-300">{linkMatch[1]}</a>;
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }} className={cn('flex gap-2.5', isUser && 'flex-row-reverse')}>
      {!isUser && (
        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}
      <div className={cn(
        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
        isUser
          ? 'rounded-tr-sm bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/20'
          : 'rounded-tl-sm border border-white/10 bg-white/5 text-slate-100 backdrop-blur',
      )}>
        {renderContent(message.content)}
      </div>
    </motion.div>
  );
}
