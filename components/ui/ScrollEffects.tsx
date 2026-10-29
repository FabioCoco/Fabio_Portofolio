"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { ENABLE_SMOOTH_SCROLL, NO_REDUCED_MOTION, REVEAL } from "@/lib/motion";

/**
 * Efek scroll global, tidak merender apa pun:
 * - reveal elemen `[data-reveal]` saat masuk layar
 * - cahaya kartu yang mengikuti kursor
 * - scroll halus Lenis (opsional, lihat lib/motion.ts)
 * Semuanya hanya aktif bila prefers-reduced-motion = no-preference; kalau tidak,
 * konten tampil apa adanya.
 */
export function ScrollEffects() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(NO_REDUCED_MOTION, () => {
      let lenis: Lenis | null = null;
      let tick: ((time: number) => void) | null = null;

      if (ENABLE_SMOOTH_SCROLL) {
        lenis = new Lenis({ anchors: { offset: -80 }, duration: 1 });
        setLenis(lenis);
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      // Reveal: sembunyikan dulu, tampilkan berkelompok saat masuk layar.
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { opacity: 0, y: REVEAL.y });
      ScrollTrigger.batch(items, {
        start: REVEAL.start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: REVEAL.duration,
            stagger: REVEAL.stagger,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      // Cahaya kartu mengikuti kursor (diatur lewat variabel CSS --mx/--my).
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest<HTMLElement>(".fx-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });

      // Tinggi halaman berubah setelah font termuat.
      let cancelled = false;
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      return () => {
        cancelled = true;
        document.removeEventListener("pointermove", onMove);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        setLenis(null);
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
