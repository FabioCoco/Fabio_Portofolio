"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";
import { getTheme, setTheme, subscribe, type Theme } from "@/lib/prefs";

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Tema ${theme === "dark" ? "malam" : "terang"}, ganti ke ${next === "light" ? "terang" : "malam"}`}
      title={`Ganti ke tema ${next === "light" ? "terang" : "malam"}`}
      className="grid h-8 w-8 place-items-center border border-line text-muted hover:border-red hover:text-accent"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
