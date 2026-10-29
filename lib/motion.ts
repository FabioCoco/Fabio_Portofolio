// Pengaturan animasi section (Fase 4). Semua dimatikan otomatis saat prefers-reduced-motion.

/** Matikan jika scroll halus (Lenis) terasa mengganggu. */
export const ENABLE_SMOOTH_SCROLL = true;

export const REVEAL = {
  y: 28,
  duration: 0.7,
  stagger: 0.08,
  // Elemen mulai muncul saat bagian atasnya mencapai 88% tinggi layar.
  start: "top 88%",
} as const;

export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";
