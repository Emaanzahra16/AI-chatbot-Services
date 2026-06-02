import Link from 'next/link';
import { ArrowLeft, Shield, Database, HardDrive, Globe, Mail, Clock, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy · Altivora AI',
  description: 'How Altivora AI collects, uses, and protects your data. GDPR compliant privacy practices.',
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-ink-950 pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Altivora AI
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-cyan-400">
            <Shield className="mr-2 h-3 w-3" />
            GDPR Compliant
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-ink-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-2 text-ink-400">
            Altivora AI Solutions SL · C/ Ejemplo 123, 28001 Madrid · NIF/CIF: B-12345678
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Data Controller */}
          <Section
            icon={Database}
            title="1. Data Controller Information"
            content={
              <>
                <p>
                  Altivora AI Solutions SL (hereinafter &quot;Altivora AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is the data controller responsible for your personal data.
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li><strong>Entity:</strong> Altivora AI Solutions SL</li>
                  <li><strong>Address:</strong> Calle Ejemplo 123, 28001 Madrid, Spain</li>
                  <li><strong>NIF/CIF:</strong> B-12345678</li>
                  <li><strong>Email:</strong> privacy@altivora.ai</li>
                  <li><strong>DPO Contact:</strong> dpo@altivora.ai</li>
                </ul>
              </>
            }
          />

          {/* 2. What Data We Collect */}
          <Section
            icon={HardDrive}
            title="2. What Personal Data We Collect"
            content={
              <>
                <p>We collect the following categories of personal data:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li><strong>Account Data:</strong> Email address, name, avatar (when you register)</li>
                  <li><strong>Conversation Data:</strong> Full chat history with our AI assistants, including messages, timestamps, and metadata</li>
                  <li><strong>Chatbot Configuration:</strong> Custom prompts, model settings, and temperature values you configure</li>
                  <li><strong>Usage Data:</strong> Token usage, response times, feature usage patterns</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, access times</li>
                  <li><strong>Payment Data:</strong> Processed via Stripe (we do not store full payment details)</li>
                </ul>
              </>
            }
          />

          {/* 3. Purpose of Processing */}
          <Section
            icon={Globe}
            title="3. How We Use Your Data (Legal Basis)"
            content={
              <>
                <p>We process your data under the following legal bases (GDPR Article 6):</p>
                <div className="mt-3 space-y-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">Contract Performance (Art. 6(1)(b))</p>
                    <p className="text-sm text-ink-300">To provide chatbot services, store conversations, and deliver features you request.</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">Legitimate Interests (Art. 6(1)(f))</p>
                    <p className="text-sm text-ink-300">To improve our AI models, analyze usage patterns, prevent abuse, and ensure security.</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">Legal Obligation (Art. 6(1)(c))</p>
                    <p className="text-sm text-ink-300">To comply with tax laws, respond to legal requests, and maintain records as required by Spanish law.</p>
                  </div>
                </div>
              </>
            }
          />

          {/* 4. Data Retention */}
          <Section
            icon={Clock}
            title="4. Data Retention Period"
            content={
              <>
                <p>We retain your data for the following periods:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li><strong>Conversation History:</strong> Stored indefinitely until you delete your account or request deletion</li>
                  <li><strong>Account Data:</strong> Retained until you close your account, plus 30 days for recovery</li>
                  <li><strong>Usage Analytics:</strong> Anonymized after 90 days</li>
                  <li><strong>Payment Records:</strong> 7 years (Spanish tax law requirement)</li>
                </ul>
                <p className="mt-3 text-sm text-ink-400">
                  You can request deletion of specific conversations or your entire account by emailing privacy@altivora.ai.
                </p>
              </>
            }
          />

          {/* 5. AI Training Disclosure */}
          <Section
            icon={Database}
            title="5. AI Model Training"
            content={
              <>
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="font-semibold text-amber-300">❌ We do NOT train AI models using your conversations</p>
                  <p className="mt-2 text-sm text-ink-300">
                    Your data is used exclusively to provide real-time responses and is never used to train or fine-tune
                    our AI models without your explicit, documented consent. If we ever offer an opt-in training program,
                    you will be asked separately and can withdraw consent at any time.
                  </p>
                </div>
              </>
            }
          />

          {/* 6. Data Sharing */}
          <Section
            icon={Globe}
            title="6. Data Sharing & Third Parties"
            content={
              <>
                <p>We share data only with essential service providers:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li><strong>OpenAI/Anthropic:</strong> Your messages are sent to AI providers for generating responses</li>
                  <li><strong>Vercel:</strong> Hosting infrastructure (EU regions)</li>
                  <li><strong>Neon/PostgreSQL:</strong> Database hosting (EU regions)</li>
                  <li><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</li>
                  <li><strong>Resend:</strong> Email notifications</li>
                </ul>
                <p className="mt-3 text-sm text-ink-400">
                  All processors have Data Processing Agreements (DPAs) in place compliant with GDPR Chapter V.
                </p>
              </>
            }
          />

          {/* 7. International Transfers */}
          <Section
            icon={Globe}
            title="7. International Data Transfers"
            content={
              <>
                <p>
                  When using OpenAI/Anthropic (US-based companies), your data may be transferred outside the EEA.
                  We ensure adequate safeguards through:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>EU Standard Contractual Clauses (SCCs)</li>
                  <li>Data Processing Agreements (DPAs)</li>
                  <li>Technical measures (encryption, pseudonymization)</li>
                </ul>
              </>
            }
          />

          {/* 8. Your GDPR Rights */}
          <Section
            icon={Shield}
            title="8. Your GDPR Rights (Articles 15-22)"
            content={
              <>
                <p>You have the following rights under GDPR:</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <RightCard right="Right to Access (Art. 15)" description="Obtain confirmation of whether we process your data and receive a copy" />
                  <RightCard right="Right to Rectification (Art. 16)" description="Correct inaccurate or incomplete personal data" />
                  <RightCard right="Right to Erasure (Art. 17)" description="Request deletion of your data (&quot;right to be forgotten&quot;)" />
                  <RightCard right="Right to Restriction (Art. 18)" description="Limit how we use your data while disputes are resolved" />
                  <RightCard right="Right to Portability (Art. 20)" description="Receive your data in a machine-readable format (JSON/CSV)" />
                  <RightCard right="Right to Object (Art. 21)" description="Object to processing based on legitimate interests" />
                </div>
                <p className="mt-4 text-sm text-ink-300">
                  To exercise your rights, email <strong className="text-white">privacy@altivora.ai</strong> with your request.
                  We respond within 30 days (GDPR Article 12).
                </p>
              </>
            }
          />

          {/* 9. Cookie Policy */}
          <Section
            icon={Trash2}
            title="9. Cookies & Tracking"
            content={
              <>
                <p>
                  We use essential cookies for authentication and functionality. Non-essential cookies (analytics)
                  require your explicit consent via our cookie banner.
                </p>
                <Link href="/cookies" className="mt-3 inline-block text-sm text-cyan-400 underline hover:text-cyan-300">
                  Read our full Cookie Policy →
                </Link>
              </>
            }
          />

          {/* 10. Data Security */}
          <Section
            icon={Shield}
            title="10. Data Security Measures"
            content={
              <>
                <p>We implement appropriate technical and organizational measures:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>Encryption at rest (AES-256) and in transit (TLS 1.3)</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee confidentiality agreements and GDPR training</li>
                  <li>Incident response plan for data breaches (72-hour notification as per Art. 33)</li>
                </ul>
              </>
            }
          />

          {/* 11. Children's Privacy */}
          <Section
            title="11. Children's Data"
            content={
              <p>
                Altivora AI is not intended for children under 16. We do not knowingly collect data from minors.
                If you believe we have data from someone under 16, contact us immediately.
              </p>
            }
          />

          {/* 12. Changes to This Policy */}
          <Section
            title="12. Updates to This Privacy Policy"
            content={
              <p>
                We may update this policy periodically. Material changes will be notified via email or website banner.
                Continued use after changes constitutes acceptance of the revised policy.
              </p>
            }
          />

          {/* Contact */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-cyan-500/10 p-6 text-center">
            <Mail className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Questions or Complaints?</h3>
            <p className="mt-2 text-ink-300">
              Contact our Data Protection Officer (DPO) at{' '}
              <a href="mailto:dpo@altivora.ai" className="text-cyan-400 underline">
                dpo@altivora.ai
              </a>
            </p>
            <p className="mt-2 text-sm text-ink-400">
              You also have the right to lodge a complaint with the{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                Spanish Data Protection Agency (AEPD)
              </a>
              .
            </p>
          </div>
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
      <div className="mt-4 text-ink-200 leading-relaxed">{content}</div>
    </div>
  );
}

function RightCard({ right, description }: { right: string; description: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/30 p-3">
      <p className="font-semibold text-white text-sm">{right}</p>
      <p className="mt-1 text-xs text-ink-300">{description}</p>
    </div>
  );
}