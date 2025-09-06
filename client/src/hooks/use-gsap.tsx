import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function useGSAP() {
  const gsapLoaded = useRef(false);

  useEffect(() => {
    const loadGSAP = async () => {
      if (gsapLoaded.current) return;

      // Load GSAP
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      document.head.appendChild(gsapScript);

      // Load ScrollTrigger
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      document.head.appendChild(scrollTriggerScript);

      await new Promise((resolve) => {
        scrollTriggerScript.onload = resolve;
      });

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        gsapLoaded.current = true;
      }
    };

    loadGSAP();
  }, []);

  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger, loaded: gsapLoaded.current };
}
