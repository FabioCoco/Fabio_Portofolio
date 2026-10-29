"use client";

export const OPEN_PALETTE_EVENT = "open-palette";

export function PaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      aria-label="Cari (buka command palette)"
      className="border border-line px-2 py-1 font-label text-[0.7rem] uppercase tracking-[0.15em] text-muted hover:border-red hover:text-accent"
    >
      Cari <kbd className="ml-1 hidden font-label sm:inline">Ctrl K</kbd>
    </button>
  );
}
