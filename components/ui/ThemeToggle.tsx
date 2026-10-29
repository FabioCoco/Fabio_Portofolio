"use client";

import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribe, type Theme } from "@/lib/prefs";

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Tema ${theme === "dark" ? "malam" : "terang"}, ganti ke ${next === "light" ? "terang" : "malam"}`}
      className="border border-line px-2 py-1 font-label text-[0.7rem] uppercase tracking-[0.15em] text-muted hover:border-red hover:text-accent"
    >
      {theme === "dark" ? "Malam" : "Terang"}
    </button>
  );
}
