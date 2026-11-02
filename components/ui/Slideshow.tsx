"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const INTERVAL = 5000;
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// Slideshow screenshot: otomatis berganti, jeda saat disentuh/hover/fokus,
// gambar tampil utuh (object-contain), dan menghormati prefers-reduced-motion.
export function Slideshow({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
    const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);
  const [hold, setHold] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const go = (n: number) => setI((n + total) % total);
  const running = !reduced && !hold && total > 1;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % total), INTERVAL);
    return () => clearTimeout(t);
  }, [running, i, total]);

  const btn =
    "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-bg/80 font-label text-lg opacity-100 hover:border-red hover:text-accent sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`Screenshot ${title}`}
      className="group mt-10"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(i - 1);
        if (e.key === "ArrowRight") go(i + 1);
      }}
    >
      <div
        className="relative aspect-[2/1] overflow-hidden border border-line bg-surface"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setHold(true);
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          setHold(false);
          if (start === null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        }}
      >
        {images.map((src, n) => (
          <Image
            key={src}
            src={src}
            alt={`Screenshot ${n + 1} dari ${title}`}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            quality={85}
            priority={n === 0}
            aria-hidden={n !== i}
            className={`object-contain transition-opacity duration-700 ease-in-out ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {total > 1 ? (
          <>
            <button type="button" aria-label="Sebelumnya" onClick={() => go(i - 1)} className={`${btn} left-2`}>
              ←
            </button>
            <button type="button" aria-label="Berikutnya" onClick={() => go(i + 1)} className={`${btn} right-2`}>
              →
            </button>
          </>
        ) : null}
      </div>
      {total > 1 ? (
        <div className="mt-3 flex items-center justify-between font-label text-xs text-muted">
          <div className="flex items-center gap-3">
            <span aria-live="off">
              {i + 1} / {total}
            </span>
          </div>
          <div className="flex gap-2">
            {images.map((src, n) => (
              <button
                key={src}
                type="button"
                aria-label={`Screenshot ${n + 1}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className={`h-2.5 w-2.5 border ${n === i ? "border-red bg-red" : "border-line hover:border-red"}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
