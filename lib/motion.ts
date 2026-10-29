// Pengaturan animasi section. Semua dimatikan otomatis saat prefers-reduced-motion.

/** Matikan jika scroll halus (Lenis) terasa mengganggu. */
export const ENABLE_SMOOTH_SCROLL = true;

export const REVEAL = {
  y: 20,
  duration: 0.6,
  stagger: 0.06,
  // Elemen mulai muncul saat bagian atasnya mencapai 88% tinggi layar.
  start: "top 88%",
} as const;

export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";
