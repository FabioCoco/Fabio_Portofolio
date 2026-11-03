"use client";

import { useEffect, useRef, useState } from "react";
import { FileIcon } from "@/components/ui/Icons";

// ?v= otomatis dari waktu modifikasi file (lihat next.config.ts) agar CV baru tidak tertahan cache.
const v = process.env.NEXT_PUBLIC_CV_VERSION;
const options = [
  { label: "Bahasa Indonesia", href: `/cv/CV_Fabio_Francisco_Indonesia.pdf?v=${v}` },
  { label: "English", href: `/cv/CV_Fabio_Francisco_English.pdf?v=${v}` },
];

// variant "text": hanya tulisan CV dalam kotak, menu membuka ke atas (dipakai di footer).
export function CvMenu({ variant = "icon" }: { variant?: "icon" | "text" }) {
  const text = variant === "text";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Lihat CV, pilih bahasa"
        title="CV"
        className="flex h-10 items-center gap-2 border border-line bg-bg/70 px-3 font-label text-xs uppercase tracking-[0.15em] hover:border-red hover:text-accent"
      >
        {text ? null : <FileIcon />}
        CV
      </button>
      {open && (
        <ul className={`absolute left-0 z-50 w-44 ${text ? "bottom-full mb-2" : "top-full mt-2"} border border-line bg-bg font-label text-xs uppercase tracking-[0.12em]`}>
          {options.map((o) => (
            <li key={o.href}>
              <a
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-muted hover:bg-line hover:text-accent"
              >
                CV · {o.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
