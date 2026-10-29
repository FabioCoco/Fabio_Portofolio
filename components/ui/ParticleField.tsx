"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getTheme, subscribe, type Theme } from "@/lib/prefs";

type P = { x: number; y: number; vx: number; vy: number; r: number; ph: number };

// Latar partikel di canvas: tema terang = konstelasi (titik terhubung garis tipis),
// tema malam = bara yang naik pelan. Tidak dirender saat prefers-reduced-motion.
export function ParticleField() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dark = theme === "dark";
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let last = 0;

    const spawn = (anywhere: boolean): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * (dark ? 0.25 : 0.3),
      vy: dark ? -(0.25 + Math.random() * 0.55) : (Math.random() - 0.5) * 0.3,
      r: dark ? 0.8 + Math.random() * 1.8 : 1 + Math.random() * 1.2,
      ph: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(Math.max((w * h) / (dark ? 26000 : 20000), 22), 70));
      parts = Array.from({ length: count }, () => spawn(true));
    };

    const LINK = 130;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 30) return; // ~33 fps cukup untuk gerak pelan
      const dt = Math.min((t - last) / 16.7, 3);
      last = t;
      ctx.clearRect(0, 0, w, h);

      if (dark) {
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          p.x += (p.vx + Math.sin(t / 1400 + p.ph) * 0.25) * dt;
          p.y += p.vy * dt;
          if (p.y < -10) parts[i] = spawn(false);
          const life = Math.max(p.y / h, 0); // memudar mendekati atas layar
          const flicker = 0.65 + 0.35 * Math.sin(t / 220 + p.ph * 3);
          const a = (0.15 + 0.6 * life) * flicker;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          g.addColorStop(0, `rgba(255,130,70,${a})`);
          g.addColorStop(0.4, `rgba(229,37,42,${a * 0.45})`);
          g.addColorStop(1, "rgba(229,37,42,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
        return;
      }

      for (const p of parts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(143,18,23,${0.16 * (1 - d / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(143,18,23,0.4)";
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };

    // Mulai agak terlambat: latar dekoratif tidak boleh bersaing dengan render awal.
    const timer = window.setTimeout(() => {
      resize();
      raf = requestAnimationFrame(frame);
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);
    }, 1800);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.clearRect(0, 0, w, h);
    };
  }, [theme]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
