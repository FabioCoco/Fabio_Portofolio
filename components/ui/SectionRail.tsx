"use client";

import { useEffect, useState } from "react";
import { skills } from "@/content/skills";
import { scrollToId } from "@/lib/scroll";

// Rel navigasi section di tepi kanan (desktop): titik tiap section, garis terisi sampai section aktif,
// dan penanda katana berpendar yang meluncur ke section yang sedang dibaca.
const SECTIONS = [
  { id: "top", label: "Hero" },
  { id: "about", label: "Tentang" },
  { id: "work", label: "Project" },
  { id: "fokus", label: "Fokus" },
  ...(skills.length > 0 ? [{ id: "skills", label: "Keahlian" }] : []),
  { id: "certificates", label: "Sertifikat" },
  { id: "contact", label: "Kontak" },
];

export function SectionRail() {
  const [active, setActive] = useState(0);
  const last = SECTIONS.length - 1;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let idx = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      // Di dasar halaman, section terakhir dianggap aktif.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = last;
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [last]);

  const pct = (active / last) * 100;

  return (
    <nav
      aria-label="Navigasi section"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden h-[55vh] max-h-[30rem] w-4 -translate-y-1/2 lg:block"
    >
      {/* Garis dasar dan garis terisi */}
      <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-red shadow-[0_0_8px_var(--red)] transition-[height] duration-700 ease-out"
        style={{ height: `${pct}%` }}
      />

      {/* Penanda katana (gambar sendiri): meluncur ke section aktif, lalu berayun seperti tebasan kecil */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ top: `${pct}%` }}
      >
        <span className="rail-pulse absolute left-1/2 top-2/3 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red" />
        <span key={active} className="rail-swing relative block origin-top">
          <svg viewBox="0 0 12 34" className="h-9 w-[0.8rem] drop-shadow-[0_0_6px_var(--red)]">
            {/* gagang */}
            <rect x="5" y="0" width="2" height="8" rx="0.6" className="fill-red-deep" />
            <path d="M5 2h2M5 4h2M5 6h2" stroke="var(--bone)" strokeWidth="0.5" opacity="0.7" />
            {/* tsuba (pelindung) */}
            <rect x="1.5" y="8" width="9" height="1.6" rx="0.8" className="fill-red" />
            {/* bilah */}
            <path d="M5 9.6h2.2v15.4c0 3.2-.6 6-1.2 8.4-.6-2.4-1-5.2-1-8.4Z" className="fill-bone" />
            <path d="M6.6 9.6v23" stroke="var(--red)" strokeWidth="0.4" opacity="0.6" />
          </svg>
        </span>
      </span>

      <ol className="relative flex h-full flex-col justify-between">
        {SECTIONS.map((s, i) => (
          <li key={s.id} className="group relative flex justify-center">
            <a
              href={`#${s.id}`}
              aria-label={s.label}
              aria-current={i === active ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(s.id);
              }}
              className="pointer-events-auto grid h-4 w-4 place-items-center"
            >
              <span
                className={`block h-2 w-2 rotate-45 border transition-all duration-300 ${
                  i <= active ? "border-red bg-red" : "border-muted bg-bg group-hover:border-red"
                } ${i === active ? "opacity-0" : ""}`}
              />
            </a>
            <span
              className={`pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap border border-line bg-bg/90 px-2 py-0.5 font-label text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-200 ${
                i === active
                  ? "translate-x-2 text-accent opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  : "translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
