'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Languages ─────────────────────────────────────────────────────────── */
// IMPORTANT: use Google Translate's own language codes for the cookie value.
//   zh-CN  = Simplified Chinese  (Google does NOT accept plain "zh")
//   he     = Hebrew              (Google accepts both "he" and legacy "iw")
const languages = [
  { code: 'es',    label: 'Español',    flag: '🇪🇸' },
  { code: 'en',    label: 'English',    flag: '🇬🇧' },
  { code: 'ca',    label: 'Català',     flag: '🇦🇩' },
  { code: 'fr',    label: 'Français',   flag: '🇫🇷' },
  { code: 'de',    label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it',    label: 'Italiano',   flag: '🇮🇹' },
  { code: 'pt',    label: 'Português',  flag: '🇵🇹' },
  { code: 'nl',    label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl',    label: 'Polski',     flag: '🇵🇱' },
  { code: 'ru',    label: 'Русский',    flag: '🇷🇺' },
  { code: 'uk',    label: 'Українська', flag: '🇺🇦' },
  { code: 'ro',    label: 'Română',     flag: '🇷🇴' },
  { code: 'tr',    label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ar',    label: 'العربية',    flag: '🇸🇦' },
  { code: 'he',    label: 'עברית',      flag: '🇮🇱' },
  { code: 'hi',    label: 'हिन्दी',     flag: '🇮🇳' },
  { code: 'zh-CN', label: '中文',       flag: '🇨🇳' },
  { code: 'ja',    label: '日本語',     flag: '🇯🇵' },
  { code: 'ko',    label: '한국어',     flag: '🇰🇷' },
];

const SOURCE = 'es';

/* ─── Cookie helpers ─────────────────────────────────────────────────────── */

function readLangCookie(): string {
  try {
    const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
    if (!m) return SOURCE;
    const code = m[1];
    // Normalise: if saved as "zh", map to "zh-CN"
    return code === 'zh' ? 'zh-CN' : code;
  } catch { return SOURCE; }
}

function writeLangCookie(langCode: string) {
  const value = langCode === SOURCE ? `/auto/${SOURCE}` : `/${SOURCE}/${langCode}`;
  const host  = window.location.hostname;
  const age   = 'max-age=86400';

  document.cookie = `googtrans=${value}; path=/; ${age}`;
  document.cookie = `googtrans=${value}; path=/; domain=${host}; ${age}`;
  if (host !== 'localhost' && !/^\d/.test(host)) {
    document.cookie = `googtrans=${value}; path=/; domain=.${host}; ${age}`;
  }
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [langOpen,     setLangOpen]     = useState(false);
  const [currentLang,  setCurrentLang]  = useState(SOURCE);
  const [switching,    setSwitching]    = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read cookie client-side only (avoids SSR mismatch)
  useEffect(() => { setCurrentLang(readLangCookie()); }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /**
   * How language switching works (100 % reliable):
   *   1. Write the `googtrans=/es/{code}` cookie on every domain variant.
   *   2. Reload the page.
   * On reload, the Google Translate script reads that cookie during its own
   * initialisation and auto-translates the entire page before first paint.
   */
  function changeLanguage(code: string) {
    if (code === currentLang) { setLangOpen(false); return; }
    setSwitching(true);
    setCurrentLang(code);
    setLangOpen(false);
    writeLangCookie(code);
    window.location.reload();
  }

  const activeLang = languages.find((l) => l.code === currentLang) ?? languages[0];

  const navItems = [
    { label: 'Servicios',      href: '#services'     },
    { label: 'Casos de éxito', href: '#case-studies' },
    { label: 'Proceso',        href: '#process'      },
    { label: 'Precios',        href: '#pricing'      },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-xl border-b border-ink-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="AI Services - Inicio">
            <Image src="/logo.png" alt="Servicios AI" width={120} height={40} className="h-14 w-auto object-contain" priority />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((i) => (
              <Link key={i.href} href={i.href}
                className="text-sm text-ink-300 hover:text-white transition">
                {i.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                disabled={switching}
                aria-label="Cambiar idioma"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-ink-300 transition hover:bg-ink-800/50 hover:text-white disabled:opacity-50"
              >
                {switching
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <Globe    className="h-4 w-4" />}
                <span className="text-base leading-none">{activeLang.flag}</span>
                <span className="hidden text-xs text-ink-400 xl:inline">{activeLang.label}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 max-h-80 w-52 overflow-y-auto rounded-xl border border-white/10 bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur-xl z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={currentLang === lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="w-6 text-center text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {currentLang === lang.code && (
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-violet-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button asChild className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white">
              <Link href="/contact">Demo gratuita</Link>
            </Button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-ink-300 hover:text-white"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="space-y-1 border-t border-ink-800/50 py-4 md:hidden">
            {navItems.map((i) => (
              <Link key={i.href} href={i.href} onClick={() => setMenuOpen(false)}
                className="block px-1 py-2 text-ink-300 hover:text-white transition">
                {i.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-ink-800/50 pt-4">
              <p className="mb-3 flex items-center gap-1.5 px-1 text-xs text-ink-500">
                <Globe className="h-3.5 w-3.5" /> Idioma
              </p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lang) => (
                  <button key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setMenuOpen(false); }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-ink-700 hover:text-white transition">
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.label}</span>
                    {currentLang === lang.code && (
                      <Check className="ml-auto h-3 w-3 flex-shrink-0 text-violet-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Button asChild className="mt-3 w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Demo gratuita</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
