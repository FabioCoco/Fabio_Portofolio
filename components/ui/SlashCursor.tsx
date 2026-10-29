"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getCursorOn, subscribe } from "@/lib/prefs";

const LIFETIME = 260; // ms jejak tebasan memudar
const MAX_POINTS = 24;

type Point = { x: number; y: number; t: number };

/**
 * Jejak tebasan di belakang kursor. Hanya desktop (hover + pointer halus), mati pada
 * prefers-reduced-motion, bisa dimatikan lewat command palette. Kursor asli tetap tampil.
 * Loop render berhenti sendiri saat tidak ada jejak.
 */
export function SlashCursor() {
  const enabled = useSyncExternalStore(subscribe, getCursorOn, () => false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!mq.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let raf = 0;
    let red = "#e5252a";
    let bone = "#ece6d8";

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      points = points.filter((p) => now - p.t < LIFETIME);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (points.length < 2) {
        raf = 0;
        return;
      }
      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const life = 1 - (now - b.t) / LIFETIME;
        ctx.globalAlpha = life;
        ctx.strokeStyle = red;
        ctx.lineWidth = 6 * life;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.strokeStyle = bone;
        ctx.lineWidth = 1.5 * life;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > MAX_POINTS) points.shift();
      if (!raf) {
        const style = getComputedStyle(document.documentElement);
        red = style.getPropertyValue("--red").trim() || red;
        bone = style.getPropertyValue("--bone").trim() || bone;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden h-screen w-screen [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  );
}
