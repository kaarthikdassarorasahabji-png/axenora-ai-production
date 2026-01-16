import { useEffect, useRef, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisScrollProps {
  children: ReactNode;
}

export function LenisScroll({ children }: LenisScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Parallax effect on scroll
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      // Update parallax elements
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scroll;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax effect only when element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const yPos = (scroll - elementTop + windowHeight) * speed;
          (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      // Scale effect on scroll
      const scaleElements = document.querySelectorAll('[data-scale]');
      scaleElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-scale') || '0.1');
        const rect = element.getBoundingClientRect();
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = 1 - (rect.top / windowHeight);
          const scale = 1 + (progress * speed);
          (element as HTMLElement).style.transform = `scale(${scale})`;
        }
      });

      // Opacity fade effect
      const fadeElements = document.querySelectorAll('[data-fade]');
      fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = 1 - (rect.top / windowHeight);
          const opacity = Math.max(0, Math.min(1, progress * 1.5));
          (element as HTMLElement).style.opacity = String(opacity);
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
