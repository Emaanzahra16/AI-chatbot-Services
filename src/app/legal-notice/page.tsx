'use client';

import Link from 'next/link';
import { ArrowLeft, Building, FileText, Shield, Mail, Phone, Globe, Scale, Award, Calendar } from 'lucide-react';

export default function LegalNoticePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-ink-950 pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to BotForge AI
        </Link>

        {/* Header - Spanish LSSI-CE Badge */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400">
            <Shield className="h-3 w-3" />
            LSSI-CE Compliant · Spanish Law 34/2002
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Aviso Legal
          </h1>
          <p className="mt-2 text-xl text-ink-300">Legal Notice</p>
          <p className="mt-4 text-ink-400">
            Last updated: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-6">
          {/* Spanish LSSI-CE Required Information */}
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-violet-500/5 p-6 backdrop-blur">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <Scale className="h-5 w-5 text-amber-400" />
              Información Legal (LSSI-CE Art. 10)
            </h2>
            <p className="mb-4 text-sm text-ink-300">
              En cumplimiento con la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información 
              y de comercio electrónico (LSSI-CE), se informa que este sitio web es operado por:
            </p>
            <div className="space-y-3 text-sm">
              <InfoRow icon={Building} label="Razón Social" value="BotForge AI Solutions SL" />
              <InfoRow icon={Mail} label="Domicilio" value="Calle Ejemplo 123, 28001 Madrid, España" />
              <InfoRow icon={FileText} label="NIF / CIF" value="B-12345678" />
              <InfoRow icon={Mail} label="Correo Electrónico" value="legal@botforge.ai" />
              <InfoRow icon={Phone} label="Teléfono" value="+34 900 123 456" />
              <InfoRow icon={Building} label="Registro Mercantil" value="Madrid, Tomo 12345, Folio 123, Sección 8, Hoja M-123456" />
              <InfoRow icon={Globe} label="Dominio" value="botforge.ai" />
            </div>
          </div>

          {/* English Version */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <Globe className="h-5 w-5 text-cyan-400" />
              Legal Information (English)
            </h2>
            <div className="space-y-3 text-sm text-ink-300">
              <p>In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), we inform you that:</p>
              <div className="mt-3 space-y-2">
                <p><strong className="text-white">Company Name:</strong> BotForge AI Solutions SL</p>
                <p><strong className="text-white">Registered Address:</strong> Calle Ejemplo 123, 28001 Madrid, Spain</p>
                <p><strong className="text-white">Tax ID (NIF/CIF):</strong> B-12345678</p>
                <p><strong className="text-white">Email:</strong> legal@botforge.ai</p>
                <p><strong className="text-white">Phone:</strong> +34 900 123 456</p>
                <p><strong className="text-white">Commercial Registry:</strong> Madrid, Volume 12345, Folio 123, Section 8, Page M-123456</p>
              </div>
            </div>
          </div>

          {/* 1. Objeto */}
          <Section
            icon={FileText}
            title="1. Objeto / Purpose"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  El presente aviso legal regula el uso del sitio web botforge.ai (en adelante, &quot;el Sitio Web&quot;), 
                  del cual es titular BotForge AI Solutions SL (en adelante, &quot;BotForge AI&quot;). El Sitio Web tiene 
                  como finalidad ofrecer servicios de chatbots y asistentes de inteligencia artificial.
                </p>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  This legal notice regulates the use of the website botforge.ai (hereinafter &quot;the Website&quot;), 
                  owned by BotForge AI Solutions SL (hereinafter &quot;BotForge AI&quot;). The Website aims to provide 
                  chatbot and artificial intelligence assistant services.
                </p>
              </>
            }
          />

          {/* 2. Condiciones de Uso */}
          <Section
            icon={Shield}
            title="2. Condiciones de Uso / Terms of Use"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  El acceso y uso del Sitio Web atribuye la condición de usuario e implica la aceptación plena 
                  y sin reservas de todas las condiciones incluidas en este Aviso Legal, así como en nuestras 
                  <Link href="/privacy" className="mx-1 text-cyan-400 underline">Política de Privacidad</Link>
                  y
                  <Link href="/terms" className="mx-1 text-cyan-400 underline">Condiciones de Servicio</Link>.
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-ink-300">
                  <li>El usuario se obliga a hacer un uso adecuado del Sitio Web conforme a la ley y el presente Aviso Legal.</li>
                  <li>Queda prohibido realizar actividades que puedan dañar, sobrecargar o deteriorar el Sitio Web.</li>
                  <li>BotForge AI se reserva el derecho de modificar unilateralmente el contenido del Sitio Web.</li>
                </ul>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  Access and use of the Website attributes the condition of user and implies full acceptance 
                  of all conditions included in this Legal Notice, as well as our 
                  <Link href="/privacy" className="mx-1 text-cyan-400 underline">Privacy Policy</Link>
                  and
                  <Link href="/terms" className="mx-1 text-cyan-400 underline">Terms of Service</Link>.
                </p>
              </>
            }
          />

          {/* 3. Propiedad Intelectual */}
          <Section
            icon={Award}
            title="3. Propiedad Intelectual / Intellectual Property"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  Todos los contenidos del Sitio Web (textos, imágenes, logotipos, diseño, estructura, etc.) 
                  son propiedad de BotForge AI o de sus licenciantes y están protegidos por la legislación 
                  española e internacional sobre propiedad intelectual e industrial.
                </p>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  All content on the Website (texts, images, logos, design, structure, etc.) is the property 
                  of BotForge AI or its licensors and is protected by Spanish and international intellectual 
                  and industrial property laws.
                </p>
              </>
            }
          />

          {/* 4. Responsabilidad */}
          <Section
            icon={Scale}
            title="4. Limitación de Responsabilidad / Limitation of Liability"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  BotForge AI no garantiza la disponibilidad, continuidad o ausencia de errores en el Sitio Web. 
                  No se responsabiliza de los daños o perjuicios que puedan derivarse del uso de la información 
                  contenida, especialmente de las respuestas generadas por inteligencia artificial (&quot;alucinaciones&quot;).
                </p>
                <div className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <p className="text-sm text-rose-300">
                    ⚠️ BotForge AI no es responsable de las decisiones tomadas basándose en respuestas generadas por IA.
                  </p>
                </div>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  BotForge AI does not guarantee the availability, continuity, or absence of errors on the Website. 
                  We are not responsible for damages that may arise from the use of the information contained, 
                  especially AI-generated responses (&quot;hallucinations&quot;).
                </p>
              </>
            }
          />

          {/* 5. Protección de Datos */}
          <Section
            icon={Shield}
            title="5. Protección de Datos / Data Protection"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 
                  de Protección de Datos Personales (LOPDGDD), le informamos que sus datos serán tratados por 
                  BotForge AI como responsable del tratamiento. Puede consultar nuestra 
                  <Link href="/privacy" className="mx-1 text-cyan-400 underline">Política de Privacidad</Link> 
                  para más información.
                </p>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  In accordance with the General Data Protection Regulation (GDPR) and Spanish Organic Law 3/2018 
                  on Personal Data Protection (LOPDGDD), we inform you that your data will be processed by 
                  BotForge AI as the data controller. Please see our 
                  <Link href="/privacy" className="mx-1 text-cyan-400 underline">Privacy Policy</Link> for more information.
                </p>
              </>
            }
          />

          {/* 6. Cookies */}
          <Section
            icon={Globe}
            title="6. Política de Cookies / Cookie Policy"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  Este Sitio Web utiliza cookies propias y de terceros. Puede consultar nuestra 
                  <Link href="/cookies" className="mx-1 text-cyan-400 underline">Política de Cookies</Link> 
                  para más información sobre cómo gestionar sus preferencias.
                </p>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  This Website uses its own and third-party cookies. Please see our 
                  <Link href="/cookies" className="mx-1 text-cyan-400 underline">Cookie Policy</Link> 
                  for more information on how to manage your preferences.
                </p>
              </>
            }
          />

          {/* 7. Legislación Aplicable */}
          <Section
            icon={Scale}
            title="7. Legislación Aplicable / Governing Law"
            content={
              <>
                <p className="font-semibold text-amber-300">Español:</p>
                <p className="text-sm text-ink-300">
                  Las presentes condiciones se rigen por la legislación española. Cualquier controversia será 
                  sometida a los Juzgados y Tribunales de <strong>Madrid, España</strong>, renunciando las partes 
                  a cualquier otro fuero que pudiera corresponderles.
                </p>
                <p className="mt-3 font-semibold text-cyan-300">English:</p>
                <p className="text-sm text-ink-300">
                  These conditions are governed by Spanish law. Any dispute shall be submitted to the courts 
                  of <strong>Madrid, Spain</strong>, with the parties waiving any other jurisdiction that may apply.
                </p>
              </>
            }
          />

          {/* 8. Contacto para Autoridades */}
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-6 backdrop-blur">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <Mail className="h-5 w-5 text-cyan-400" />
              Contacto para Autoridades / Contact for Authorities
            </h2>
            <p className="text-sm text-ink-300">
              Para comunicaciones oficiales con autoridades, por favor contacte a:
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <p><strong className="text-white">Email:</strong> <a href="mailto:legal@botforge.ai" className="text-cyan-400 underline">legal@botforge.ai</a></p>
              <p><strong className="text-white">Teléfono / Phone:</strong> +34 900 123 456</p>
              <p><strong className="text-white">Dirección / Address:</strong> Calle Ejemplo 123, 28001 Madrid, España</p>
            </div>
            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-xs text-amber-300">
                📋 Este Aviso Legal cumple con la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de 
                la Información y de Comercio Electrónico (LSSI-CE).
              </p>
              <p className="mt-1 text-xs text-cyan-300">
                📋 This Legal Notice complies with Spanish Law 34/2002 on Information Society Services and 
                Electronic Commerce (LSSI-CE).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-ink-400">
          <p>© {currentYear} BotForge AI Solutions SL. Todos los derechos reservados.</p>
          <p className="mt-1">
            <Link href="/privacy" className="mx-2 hover:text-cyan-400">Privacidad</Link> •
            <Link href="/terms" className="mx-2 hover:text-cyan-400">Términos</Link> •
            <Link href="/cookies" className="mx-2 hover:text-cyan-400">Cookies</Link> •
            <Link href="/legal-notice" className="mx-2 text-cyan-400">Aviso Legal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper components
function Section({ icon: Icon, title, content }: { icon?: any; title: string; content: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-cyan-400" />}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="mt-4 leading-relaxed">{content}</div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-start gap-3 border-b border-white/5 pb-2">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
      <span className="w-32 text-sm font-medium text-ink-300">{label}:</span>
      <span className="flex-1 text-sm text-white">{value}</span>
    </div>
  );
}