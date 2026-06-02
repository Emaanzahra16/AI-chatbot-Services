'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, AlertCircle, Settings, Trash2, Info } from 'lucide-react';
import Cookies from 'js-cookie';

// Metadata removed - Next.js will use default or layout metadata

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Load saved preferences
    const saved = Cookies.get('cookie-preferences');
    if (saved) {
      try {
        setCookiePreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cookie preferences');
      }
    }
  }, []);

  const savePreferences = () => {
    Cookies.set('cookie-preferences', JSON.stringify(cookiePreferences), {
      expires: 365,
      secure: true,
      sameSite: 'strict',
    });
    alert('Preferences saved! Page will reload to apply changes.');
    window.location.reload();
  };

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      functional: true,
    });
    Cookies.set('cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      functional: true,
    }), { expires: 365, secure: true, sameSite: 'strict' });
    alert('All cookies accepted! Page will reload.');
    window.location.reload();
  };

  const rejectNonEssential = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      functional: false,
    });
    Cookies.set('cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      functional: false,
    }), { expires: 365, secure: true, sameSite: 'strict' });
    alert('Only essential cookies enabled. Page will reload.');
    window.location.reload();
  };

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
            <Cookie className="mr-2 h-3 w-3" />
            GDPR Compliant
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-lg text-ink-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-2 text-ink-400">
            Learn how we use cookies and how to control your preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Cookie Control Panel */}
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-6 backdrop-blur">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
              <Settings className="h-5 w-5 text-cyan-400" />
              Your Cookie Preferences
            </h2>
            <p className="mb-6 text-sm text-ink-300">
              Use the controls below to manage your cookie preferences. Essential cookies cannot be disabled as they are required for the website to function.
            </p>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <h3 className="font-semibold text-white">✅ Necessary Cookies</h3>
                  <p className="text-xs text-ink-400">Authentication, security, and basic functionality</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">Always Active</span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <h3 className="font-semibold text-white">📊 Analytics Cookies</h3>
                  <p className="text-xs text-ink-400">Page views, user behavior, and performance metrics</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) => setCookiePreferences({ ...cookiePreferences, analytics: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                </label>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <h3 className="font-semibold text-white">⚙️ Functional Cookies</h3>
                  <p className="text-xs text-ink-400">Remember preferences, chat history, and UI settings</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.functional}
                    onChange={(e) => setCookiePreferences({ ...cookiePreferences, functional: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={savePreferences}
                className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Accept All Cookies
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-ink-300 transition-all hover:border-rose-500/40 hover:text-white"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>

          {/* What Are Cookies */}
          <Section
            icon={Info}
            title="1. What Are Cookies?"
            content={
              <p>
                Cookies are small text files stored on your device when you visit websites. They help us remember your 
                preferences, understand how you use our site, and improve your experience. Cookies do not contain viruses 
                or malicious code.
              </p>
            }
          />

          {/* Types of Cookies */}
          <Section
            icon={Cookie}
            title="2. Types of Cookies We Use"
            content={
              <div className="space-y-4">
                <CookieType
                  name="Necessary Cookies"
                  purpose="Essential for website functionality. Cannot be disabled."
                  duration="Session to 1 year"
                  examples="Authentication tokens, security flags, CSRF protection"
                />
                <CookieType
                  name="Analytics Cookies"
                  purpose="Help us understand how visitors interact with our website."
                  duration="Up to 2 years"
                  examples="Page views, bounce rate, user flow, time on site"
                  optOut="Can be disabled via cookie preferences"
                />
                <CookieType
                  name="Functional Cookies"
                  purpose="Remember your preferences and settings."
                  duration="Up to 1 year"
                  examples="Theme preference, language selection, chat history visibility"
                  optOut="Can be disabled via cookie preferences"
                />
                <CookieType
                  name="Third-Party Cookies"
                  purpose="Used by integrated services like Stripe (payments) and OpenAI."
                  duration="Varies by provider"
                  examples="Payment processing, AI response generation"
                  optOut="Required for core functionality"
                />
              </div>
            }
          />

          {/* Specific Cookies List */}
          <Section
            title="3. Specific Cookies We Set"
            content={
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10">
                    <tr className="text-left text-ink-300">
                      <th className="pb-2">Cookie Name</th>
                      <th className="pb-2">Purpose</th>
                      <th className="pb-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink-400">
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-mono text-xs">altivora-terms-accepted</td>
                      <td className="py-2 text-xs">Stores terms acceptance status</td>
                      <td className="py-2 text-xs">1 year</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-mono text-xs">cookie-preferences</td>
                      <td className="py-2 text-xs">Stores your cookie consent choices</td>
                      <td className="py-2 text-xs">1 year</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-mono text-xs">next-auth.session-token</td>
                      <td className="py-2 text-xs">User authentication (when logged in)</td>
                      <td className="py-2 text-xs">Session</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 font-mono text-xs">__Secure-next-auth.callback-url</td>
                      <td className="py-2 text-xs">Redirect handling after login</td>
                      <td className="py-2 text-xs">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />

          {/* GDPR Compliance */}
          <Section
            icon={Shield}
            title="4. GDPR Compliance"
            content={
              <>
                <p>We comply with GDPR Article 7 (conditions for consent) and ePrivacy Directive (Cookie Law):</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-ink-300">
                  <li><strong>Prior consent required</strong> for non-essential cookies</li>
                  <li><strong>No cookies loaded</strong> until you accept or set preferences</li>
                  <li><strong>Clear opt-out mechanisms</strong> provided on this page</li>
                  <li><strong>Withdrawal of consent</strong> is as easy as giving consent</li>
                  <li><strong>Cookie duration limited</strong> to 12 months maximum</li>
                </ul>
              </>
            }
          />

          {/* Managing Cookies */}
          <Section
            icon={Trash2}
            title="5. How to Manage or Delete Cookies"
            content={
              <>
                <p>You can control cookies through your browser settings:</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <BrowserLink browser="Chrome" url="https://support.google.com/chrome/answer/95647" />
                  <BrowserLink browser="Firefox" url="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" />
                  <BrowserLink browser="Safari" url="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" />
                  <BrowserLink browser="Edge" url="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" />
                </div>
                <p className="mt-4 text-sm text-ink-300">
                  ⚠️ Disabling all cookies may break certain website features, including authentication and chat history.
                </p>
              </>
            }
          />

          {/* Cookie Banner Info */}
          <Section
            icon={AlertCircle}
            title="6. Our Cookie Banner"
            content={
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-sm text-amber-300">
                  🔔 When you first visit Altivora AI, a cookie banner will appear asking for your consent before 
                  loading any non-essential cookies. You can change your preferences anytime on this page.
                </p>
                <p className="mt-2 text-sm text-ink-300">
                  The cookie banner will not reappear once you&apos;ve made a choice, but you can reset your preferences 
                  by clearing your browser cookies or using the controls above.
                </p>
              </div>
            }
          />

          {/* Updates */}
          <Section
            title="7. Updates to This Policy"
            content={
              <p>
                We may update this Cookie Policy periodically. Significant changes will be notified via a banner on our website.
                Continued use of our site after changes constitutes acceptance of the updated policy.
              </p>
            }
          />

          {/* Contact */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-cyan-500/10 p-6 text-center">
            <Cookie className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Questions About Cookies?</h3>
            <p className="mt-2 text-ink-300">
              Contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@altivora.ai" className="text-cyan-400 underline">
                privacy@altivora.ai
              </a>
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

function CookieType({ name, purpose, duration, examples, optOut }: { name: string; purpose: string; duration: string; examples: string; optOut?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="mt-1 text-xs text-ink-300">{purpose}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-ink-400">Duration:</span>{' '}
          <span className="text-ink-200">{duration}</span>
        </div>
        <div>
          <span className="text-ink-400">Examples:</span>{' '}
          <span className="text-ink-200">{examples}</span>
        </div>
      </div>
      {optOut && (
        <p className="mt-1 text-xs text-cyan-400">{optOut}</p>
      )}
    </div>
  );
}

function BrowserLink({ browser, url }: { browser: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-lg border border-white/10 p-3 transition-all hover:border-cyan-500/40 hover:bg-white/5"
    >
      <span className="text-sm text-white">{browser}</span>
      <span className="text-xs text-cyan-400">Instructions →</span>
    </a>
  );
}