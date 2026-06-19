import Link from 'next/link';
import { ArrowLeft, FileText, Shield, UserCheck, Mail, Globe, Lock, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Términos de servicio · AI Services',
  description: 'Términos y condiciones de uso de AI Services. Servicios de IA, automatización y desarrollo web para empresas.',
};

const COMPANY   = 'AI Services';
const EMAIL     = 'ai.servicios.chatbot@gmail.com';
const WEBSITE   = 'https://ai-chatbot-services.vercel.app';
const LOCATION  = 'Barcelona, España';
const UPDATED   = 'Junio 2025';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-ink-950 pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-ink-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <div className="mb-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-violet-400">
            <FileText className="mr-2 h-3 w-3" /> Documento legal
          </div>
          <h1 className="text-4xl font-bold text-white">Términos de servicio</h1>
          <p className="mt-3 text-ink-400">Última actualización: {UPDATED}</p>
        </div>

        <div className="space-y-8 text-ink-300 leading-relaxed">

          <Section icon={UserCheck} title="1. Quiénes somos">
            <p><strong className="text-white">{COMPANY}</strong> es un proveedor de servicios de inteligencia artificial, automatización y desarrollo web con sede en {LOCATION}. Puedes contactarnos en <a href={`mailto:${EMAIL}`} className="text-violet-400 hover:text-violet-300">{EMAIL}</a>.</p>
          </Section>

          <Section icon={Globe} title="2. Uso del sitio web">
            <p>Al acceder a <a href={WEBSITE} className="text-violet-400 hover:text-violet-300">{WEBSITE}</a> aceptas utilizar el sitio exclusivamente con fines lícitos. Queda prohibido:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Usar el sitio de forma que infrinja la legislación española o europea aplicable.</li>
              <li>Transmitir contenido dañino, difamatorio, obsceno o fraudulento.</li>
              <li>Intentar obtener acceso no autorizado a nuestros sistemas.</li>
              <li>Realizar scraping automatizado sin autorización previa por escrito.</li>
            </ul>
          </Section>

          <Section icon={Shield} title="3. Servicios ofrecidos">
            <p>{COMPANY} ofrece los siguientes servicios a empresas:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong className="text-white">Custom AI Chatbots</strong> — Asistentes conversacionales entrenados con datos del cliente.</li>
              <li><strong className="text-white">AI Agent Workflows</strong> — Automatización de procesos empresariales mediante agentes IA.</li>
              <li><strong className="text-white">Web Design & Development</strong> — Diseño y desarrollo de sitios web orientados a conversión.</li>
              <li><strong className="text-white">AI Integration</strong> — Integración de herramientas IA con sistemas existentes (CRM, WhatsApp, email).</li>
            </ul>
            <p className="mt-3">Las condiciones específicas de cada proyecto se establecen en el contrato firmado entre las partes.</p>
          </Section>

          <Section icon={Lock} title="4. Propiedad intelectual">
            <p>Todo el contenido de este sitio web — incluyendo textos, imágenes, logotipos y código — es propiedad de {COMPANY} o sus licenciantes y está protegido por la legislación de propiedad intelectual vigente en España y la Unión Europea.</p>
            <p className="mt-2">El software y las soluciones desarrolladas para los clientes se rigen por las condiciones acordadas contractualmente. Salvo pacto en contrario, {COMPANY} conserva la propiedad de los componentes reutilizables y la propiedad intelectual subyacente.</p>
          </Section>

          <Section icon={AlertTriangle} title="5. Limitación de responsabilidad">
            <p>{COMPANY} no será responsable de daños indirectos, incidentales o consecuentes derivados del uso de los servicios, hasta el máximo permitido por la legislación aplicable.</p>
            <p className="mt-2">La responsabilidad máxima de {COMPANY} frente a un cliente en relación con cualquier proyecto no superará el importe total abonado por dicho proyecto en los 12 meses previos al incidente.</p>
          </Section>

          <Section icon={Shield} title="6. Protección de datos (GDPR)">
            <p>{COMPANY} trata los datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD/GDPR) y la Ley Orgánica de Protección de Datos (LOPDGDD) española.</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Los datos recogidos a través del formulario de contacto se usan únicamente para responder a tu consulta.</li>
              <li>No vendemos ni cedemos datos personales a terceros.</li>
              <li>Toda la infraestructura es 100% EU-hosted.</li>
              <li>Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad escribiendo a <a href={`mailto:${EMAIL}`} className="text-violet-400">{EMAIL}</a>.</li>
            </ul>
          </Section>

          <Section icon={Mail} title="7. Contacto">
            <p>Para cualquier consulta sobre estos términos:</p>
            <div className="mt-3 rounded-xl border border-ink-700 bg-ink-800/30 p-4 text-sm">
              <p><strong className="text-white">{COMPANY}</strong></p>
              <p>{LOCATION}</p>
              <p><a href={`mailto:${EMAIL}`} className="text-violet-400 hover:text-violet-300">{EMAIL}</a></p>
              <p><a href="https://wa.me/34624280211" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">+34 624 280 211 (WhatsApp)</a></p>
            </div>
          </Section>

          <div className="border-t border-ink-800 pt-6 text-sm text-ink-500">
            <p>Estos términos se rigen por la legislación española. Cualquier disputa se someterá a los juzgados y tribunales de Barcelona, con renuncia expresa a cualquier otro fuero.</p>
            <p className="mt-2">© {new Date().getFullYear()} {COMPANY}. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-700/50 bg-ink-800/20 p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
        <Icon className="h-5 w-5 text-violet-400 flex-shrink-0" />
        {title}
      </h2>
      <div className="text-ink-300 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
