'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ca', name: 'Català', flag: '🇦🇩' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load Google Translate script on mount
  useEffect(() => {
    // Check if already loaded
    if (document.querySelector('#google-translate-script')) return;

    // Define the initialization function
    (window as any).googleTranslateElementInit = function() {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'es',
          includedLanguages: 'es,en,ca,fr,de,it,pt,nl,pl,ru,uk,ro,tr,ar,he,hi,zh,ja,ko',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
        console.log('Google Translate initialized!');
      }
    };

    // Load the script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // If Google Translate is already available
    if ((window as any).google && (window as any).google.translate) {
      (window as any).googleTranslateElementInit();
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Method 1: Find Google Translate dropdown
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
      return;
    }
    
    // Method 2: Set cookie and reload
    document.cookie = `googtrans=/es/${langCode}; path=/`;
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  const getCurrentLangLabel = () => {
    const lang = languages.find(l => l.code === currentLang);
    return lang ? lang.flag : '🌍';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white transition-all hover:border-violet-500/40 hover:bg-white/10"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline text-sm">{getCurrentLangLabel()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-ink-900/95 backdrop-blur-xl shadow-2xl z-50 p-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-ink-200 rounded-lg transition-colors hover:bg-white/10"
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLang === lang.code && (
                <Check className="h-4 w-4 ml-auto text-violet-400" />
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Hidden div for Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }} />
    </div>
  );
}