'use client';

import { useEffect } from 'react';

/**
 * Loads the Google Translate widget entirely on the client, after React has
 * finished hydrating.  Using `dynamic(() => import(...), { ssr: false })`
 * in layout.tsx ensures this component is never rendered by the server,
 * which eliminates the hydration mismatch caused by GT injecting DOM nodes
 * before React can reconcile.
 */
export default function GoogleTranslateLoader() {
  useEffect(() => {
    // Don't double-load
    if (document.getElementById('gt-script')) return;

    (window as any).googleTranslateElementInit = function () {
      if (!(window as any).google?.translate) return;
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          // zh-CN is the correct code for Simplified Chinese in GT
          includedLanguages:
            'es,en,ca,fr,de,it,pt,nl,pl,ru,uk,ro,tr,ar,he,hi,zh-CN,ja,ko',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);

    /* ------------------------------------------------------------------
     * Aggressively suppress every piece of Google Translate UI:
     *   • the top banner iframe  (goog-te-banner-frame)
     *   • the body top-offset GT adds to make room for the banner
     *   • the gadget / widget container
     * We use both CSS injection AND a MutationObserver so GT can't
     * re-show elements after we hide them.
     * ------------------------------------------------------------------ */
    const style = document.createElement('style');
    style.id = 'gt-hide-styles';
    style.textContent = `
      /* The banner is an <iframe> — target the element, not just the class */
      iframe.goog-te-banner-frame,
      .goog-te-banner-frame { display: none !important; visibility: hidden !important; }

      /* GT shifts body down to make room for its banner — undo that */
      body { top: 0 !important; }

      /* Widget container and everything inside it */
      #google_translate_element,
      .goog-te-gadget,
      .skiptranslate { display: none !important; }

      /* Tooltip / balloon / popup */
      #goog-gt-tt,
      .goog-te-balloon-frame,
      .goog-tooltip,
      .goog-te-menu-value { display: none !important; }
    `;
    document.head.appendChild(style);

    const forceHide = () => {
      // Iframe banner
      document
        .querySelectorAll<HTMLElement>('iframe.goog-te-banner-frame')
        .forEach((el) => (el.style.display = 'none'));

      // Body top offset
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
    };

    // Watch for GT injecting the banner dynamically
    const obs = new MutationObserver(forceHide);
    obs.observe(document.body, { childList: true, subtree: false });

    // Also poll for the first 6 s in case the observer misses something
    const timers = [200, 500, 1000, 2000, 3000, 6000].map((ms) =>
      setTimeout(forceHide, ms)
    );

    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // The div GT mounts into — hidden, just needs to exist in the DOM
  return <div id="google_translate_element" aria-hidden="true" />;
}
