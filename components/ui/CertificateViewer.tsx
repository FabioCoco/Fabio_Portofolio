"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { setScrollLocked } from "@/lib/scroll";

// Tombol "Lihat gambar" + dialog modal: sertifikat tampil di dalam halaman, bukan membuka tab baru.
// Gambar baru dimuat saat dialog dibuka supaya 19 sertifikat tidak diunduh sekaligus.
export function CertificateViewer({
  src,
  title,
  meta,
  className,
}: {
  src: string;
  title: string;
  meta: string;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    setScrollLocked(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <button type="button" onClick={show} className={className}>
        Lihat gambar
      </button>
      <dialog
        ref={dialog}
        aria-label={`Sertifikat ${title}`}
        data-lenis-prevent
        onClose={() => {
          setOpen(false);
          setScrollLocked(false);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[94vh] w-[min(94vw,62rem)] overflow-y-auto overscroll-contain border border-bone bg-surface p-2 text-bone backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {open ? (
          <div className="border border-line p-4 sm:p-6">
            <div className="grid place-items-center border border-line bg-white">
              <Image
                src={src}
                alt={`Gambar sertifikat ${title}`}
                width={1400}
                height={990}
                sizes="(min-width: 1024px) 56rem, 90vw"
                className="h-auto max-h-[56vh] w-auto max-w-full"
              />
            </div>
            <h3 className="mt-5 font-display text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
              {title}
            </h3>
            <p className="mt-2 font-label text-xs uppercase tracking-[0.2em] text-muted">{meta}</p>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              className="mt-5 bg-bone px-5 py-2.5 font-label text-xs uppercase tracking-[0.2em] text-bg hover:bg-red hover:text-white"
            >
              Tutup
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
