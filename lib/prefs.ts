// Preferensi pengguna kecil (tema, kursor tebasan) dengan store sederhana untuk
// useSyncExternalStore. Disimpan di localStorage; semua akses dibungkus try/catch.

export type Theme = "dark" | "light";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  emit();
}

export function getCursorOn(): boolean {
  try {
    return localStorage.getItem("slash-cursor") !== "off";
  } catch {
    return true;
  }
}

export function setCursorOn(on: boolean) {
  try {
    localStorage.setItem("slash-cursor", on ? "on" : "off");
  } catch {}
  emit();
}
