"use client";

import dynamic from "next/dynamic";

// Bagian yang tidak dibutuhkan untuk render pertama dimuat terpisah (tanpa SSR) supaya
// JavaScript awal lebih kecil dan halaman lebih cepat interaktif.
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette), {
  ssr: false,
});
const SlashCursor = dynamic(() => import("@/components/ui/SlashCursor").then((m) => m.SlashCursor), {
  ssr: false,
});
const ParticleField = dynamic(() => import("@/components/ui/ParticleField").then((m) => m.ParticleField), {
  ssr: false,
});

export function LazyExtras() {
  return (
    <>
      <CommandPalette />
      <SlashCursor />
    </>
  );
}

export function LazyParticles() {
  return <ParticleField />;
}
