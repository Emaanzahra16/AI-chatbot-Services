import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Shield, Terminal, UserX, CreditCard, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service · Altivora AI',
  description: 'Terms and conditions for using Altivora AI chatbot services. User responsibilities, liability limits, and prohibited uses.',
};

export default function TermsPage() {
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
            <FileText className="mr-2 h-3 w-3" />
            Legally Binding Agreement
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-ink-300">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-2 text-ink-400">
            By using Altivora AI, you agree to these terms. Please read carefully.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Acceptance of Terms */}
          <Section
            icon={FileText}
            title="1. Acceptance of Terms"
            content={
              <>
                <p>
                  By accessing or using Altivora AI (the &quot;Service&quot;), you agree to be bound by these Terms of Service 
                  (&quot;Terms&quot;). If you do not agree, do not use the Service.
                </p>
                <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="text-sm text-amber-300">
                    ⚠️ These terms contain a binding arbitration clause and class action waiver that affect your rights.
                  </p>
                </div>
              </>
            }
          />

          {/* 2. Eligibility */}
          <Section
            icon={UserX}
            title="2. Eligibility"
            content={
              <>
                <p>You may use Altivora AI only if:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>You are at least <strong className="text-white">16 years old</strong></li>
                  <li>You are not located in a country subject to EU/UN sanctions</li>
                  <li>You have not been previously banned from our Service</li>
                  <li>You are not a competitor using the Service for competitive analysis</li>
                </ul>
              </>
            }
          />

          {/* 3. Account Registration */}
          <Section
            icon={Shield}
            title="3. Account Responsibilities"
            content={
              <>
                <p>When you create an account:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>You are responsible for maintaining account security</li>
                  <li>You are liable for all activity under your account</li>
                  <li>You must provide accurate, current, and complete information</li>
                  <li>You must notify us immediately of unauthorized access</li>
                  <li>One person may not hold multiple free accounts</li>
                </ul>
              </>
            }
          />

          {/* 4. AI Hallucination Disclaimer - IMPORTANT */}
          <Section
            icon={AlertTriangle}
            title="4. AI Hallucination Disclaimer ⚠️"
            content={
              <>
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
                  <p className="font-semibold text-rose-300">LIMITATION OF AI ACCURACY</p>
                  <p className="mt-2 text-sm">
                    Altivora AI uses Large Language Models (LLMs) that can generate <strong className="text-white">incorrect, biased, or nonsensical information</strong> 
                    (commonly known as &quot;hallucinations&quot;). You acknowledge that:
                  </p>
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-ink-300">
                    <li>AI responses may be factually wrong, outdated, or misleading</li>
                    <li>AI responses may reflect biases present in training data</li>
                    <li>AI cannot provide legal, medical, financial, or professional advice</li>
                    <li><strong className="text-white">You are solely responsible</strong> for verifying any AI-generated information before relying on it</li>
                  </ul>
                  <p className="mt-3 text-sm font-semibold text-rose-300">
                    Altivora AI is NOT liable for any damages arising from reliance on AI-generated content.
                  </p>
                </div>
              </>
            }
          />

          {/* 5. Prohibited Uses */}
          <Section
            icon={Terminal}
            title="5. Prohibited Uses & Prompt Injection"
            content={
              <>
                <p>The following uses are strictly <span className="text-rose-300">FORBIDDEN</span>:</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ProhibitedCard title="❌ Prompt Injection Attacks" description="Attempting to override, jailbreak, or manipulate system prompts or security controls" />
                  <ProhibitedCard title="❌ Malicious Content" description="Generating hate speech, harassment, threats, self-harm, or illegal content" />
                  <ProhibitedCard title="❌ Reverse Engineering" description="Extracting model weights, decompiling, or attempting to replicate our AI systems" />
                  <ProhibitedCard title="❌ Automated Abuse" description="Using bots, crawlers, or automation beyond fair usage limits" />
                  <ProhibitedCard title="❌ Harmful Code" description="Generating malware, ransomware, exploits, or malicious scripts" />
                  <ProhibitedCard title="❌ Misinformation" description="Deliberately generating false information for deception" />
                  <ProhibitedCard title="❌ Privacy Violations" description="Inputting personal data without consent or using for surveillance" />
                  <ProhibitedCard title="❌ Competitive Analysis" description="Benchmarking, scraping, or copying for competing services" />
                </div>
                <p className="mt-4 text-sm text-ink-300">
                  Violation may result in <strong className="text-white">immediate account termination</strong> and <strong className="text-white">legal liability</strong>.
                </p>
              </>
            }
          />

          {/* 6. Intellectual Property */}
          <Section
            icon={Scale}
            title="6. Intellectual Property Rights"
            content={
              <>
                <div className="space-y-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">What We Own:</p>
                    <p className="text-sm text-ink-300">Altivora AI software, UI/UX design, logos, trademarks, and underlying AI technology.</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">What You Own:</p>
                    <p className="text-sm text-ink-300">Your input prompts and any original content you create using our Service.</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold text-white">AI-Generated Output:</p>
                    <p className="text-sm text-ink-300">
                      We assign you all rights to AI-generated output, subject to these Terms. However, similar output may 
                      be generated for other users due to the nature of AI models.
                    </p>
                  </div>
                </div>
              </>
            }
          />

          {/* 7. Data Usage */}
          <Section
            title="7. Data & Privacy"
            content={
              <>
                <p>
                  Your use of the Service is governed by our <Link href="/privacy" className="text-cyan-400 underline">Privacy Policy</Link>.
                  By using Altivora AI, you consent to:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>Collection and processing of your conversation data</li>
                  <li>Storage of chat history in our databases</li>
                  <li>Transfer of data to AI providers (OpenAI/Anthropic) for response generation</li>
                  <li><strong className="text-white">Your data is NOT used to train AI models</strong> without explicit opt-in</li>
                </ul>
              </>
            }
          />

          {/* 8. Payment Terms */}
          <Section
            icon={CreditCard}
            title="8. Subscription & Payments"
            content={
              <>
                <ul className="list-inside list-disc space-y-1 text-ink-300">
                  <li>Fees are billed in advance on a monthly or yearly basis</li>
                  <li><strong>No refunds</strong> for partial months or unused conversations</li>
                  <li>You may cancel anytime; cancellation effective at next billing period</li>
                  <li>We reserve the right to change prices with 30 days&apos; notice</li>
                  <li>Unpaid subscriptions may be suspended after 14 days</li>
                </ul>
                <p className="mt-3 text-sm text-ink-400">
                  All fees exclude taxes, which are your responsibility.
                </p>
              </>
            }
          />

          {/* 9. Service Level & Availability */}
          <Section
            title="9. Service Availability"
            content={
              <>
                <p>We strive for 99.9% uptime but do not guarantee uninterrupted service. We may:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>Perform maintenance with or without notice</li>
                  <li>Suspend service for security or legal reasons</li>
                  <li>Discontinue features or the entire Service (with notice for paid users)</li>
                </ul>
              </>
            }
          />

          {/* 10. Limitation of Liability - CRITICAL */}
          <Section
            icon={AlertTriangle}
            title="10. Limitation of Liability"
            content={
              <>
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
                  <p className="font-semibold text-rose-300">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-ink-300">
                    <li>Altivora AI is <strong className="text-white">NOT LIABLE</strong> for any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Our total liability is limited to the <strong className="text-white">amount you paid in the past 12 months</strong> (or €100 if free tier)</li>
                    <li>We are <strong className="text-white">NOT LIABLE</strong> for damages caused by AI hallucinations, data loss, or service interruptions</li>
                    <li>We are <strong className="text-white">NOT LIABLE</strong> for third-party services (OpenAI, hosting providers, etc.)</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Some jurisdictions do not allow certain liability limitations. In such cases, our liability is limited to the fullest extent permitted.
                  </p>
                </div>
              </>
            }
          />

          {/* 11. Indemnification */}
          <Section
            title="11. Indemnification"
            content={
              <p>
                You agree to indemnify and hold harmless Altivora AI from any claims, damages, or expenses 
                arising from your violation of these Terms, your misuse of the Service, or your violation of applicable laws.
              </p>
            }
          />

          {/* 12. Termination */}
          <Section
            title="12. Termination"
            content={
              <>
                <p>We may terminate or suspend your account immediately for:</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li>Violation of these Terms</li>
                  <li>Extended inactivity (12+ months for free accounts)</li>
                  <li>Legal or regulatory requirements</li>
                </ul>
                <p className="mt-3 text-sm text-ink-300">
                  Upon termination, your right to use the Service ceases immediately. You may export your data within 30 days.
                </p>
              </>
            }
          />

          {/* 13. Governing Law */}
          <Section
            icon={Scale}
            title="13. Governing Law & Dispute Resolution"
            content={
              <>
                <p>These Terms are governed by the laws of <strong className="text-white">Spain</strong> (excluding conflict of laws).</p>
                <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Arbitration Agreement:</p>
                  <p className="mt-1 text-sm text-ink-300">
                    Any dispute shall be resolved through binding arbitration in <strong>Madrid, Spain</strong>, in English or Spanish.
                    You waive the right to participate in class actions or class arbitrations.
                  </p>
                </div>
              </>
            }
          />

          {/* 14. Changes to Terms */}
          <Section
            title="14. Modifications to Terms"
            content={
              <p>
                We may update these Terms periodically. Material changes will be notified via email or website banner.
                Continued use after 30 days constitutes acceptance. If you disagree, you may terminate your account.
              </p>
            }
          />

          {/* 15. Contact */}
          <Section
            title="15. Contact Information"
            content={
              <div className="space-y-2">
                <p>Legal questions or formal notices should be sent to:</p>
                <p className="font-mono text-sm text-ink-300">
                  Altivora AI Solutions SL<br />
                  Attn: Legal Department<br />
                  Calle Ejemplo 123, 28001 Madrid, Spain<br />
                  Email: <a href="mailto:legal@altivora.ai" className="text-cyan-400 underline">legal@altivora.ai</a>
                </p>
              </div>
            }
          />
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-ink-400">
          <p>
            These Terms constitute the entire agreement between you and Altivora AI.
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
      <div className="mt-4 text-ink-200 leading-relaxed">{content}</div>
    </div>
  );
}

function ProhibitedCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
      <p className="font-semibold text-rose-300 text-sm">{title}</p>
      <p className="mt-1 text-xs text-ink-300">{description}</p>
    </div>
  );
}