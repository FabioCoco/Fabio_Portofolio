"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import {
  getCursorOn,
  getTheme,
  setCursorOn,
  setTheme,
  subscribe,
  type Theme,
} from "@/lib/prefs";
import { scrollToId } from "@/lib/scroll";
import { OPEN_PALETTE_EVENT } from "@/components/ui/PaletteTrigger";

type Command = { id: string; group: string; label: string; run: () => void };

// Section di beranda (scroll)
const SECTIONS = [
  { id: "top", label: "Beranda" },
  { id: "about", label: "About (Captain's Notes)" },
  ...(skills.length > 0 ? [{ id: "skills", label: "Skills (Mana Stats)" }] : []),
  { id: "contact", label: "Contact (Join the Squad)" },
];

export function CommandPalette() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");
  const cursorOn = useSyncExternalStore(subscribe, getCursorOn, () => true);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const goToSection = useCallback(
    (id: string) => {
      if (pathname === "/") scrollToId(id);
      else router.push(`/#${id}`);
    },
    [pathname, router],
  );

  const commands = useMemo<Command[]>(() => {
    const external = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "page-projects", group: "Halaman", label: "Semua project", run: () => router.push("/projects") },
      {
        id: "page-certificates",
        group: "Halaman",
        label: "Semua sertifikat",
        run: () => router.push("/certificates"),
      },
      ...SECTIONS.map((s) => ({
        id: `go-${s.id}`,
        group: "Navigasi",
        label: s.label,
        run: () => goToSection(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Project",
        label: p.title,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      { id: "github", group: "Tautan", label: "Buka GitHub", run: external(profile.links.github) },
      { id: "linkedin", group: "Tautan", label: "Buka LinkedIn", run: external(profile.links.linkedin) },
      {
        id: "copy-email",
        group: "Tautan",
        label: "Salin email",
        run: () => void navigator.clipboard?.writeText(profile.links.email).catch(() => {}),
      },
      {
        id: "theme",
        group: "Pengaturan",
        label: theme === "dark" ? "Ganti ke tema terang" : "Ganti ke tema malam",
        run: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      {
        id: "cursor",
        group: "Pengaturan",
        label: cursorOn ? "Matikan kursor tebasan" : "Nyalakan kursor tebasan",
        run: () => setCursorOn(!cursorOn),
      },
    ];
  }, [goToSection, router, theme, cursorOn]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));
  }, [commands, query]);

  const open = useCallback(() => {
    const d = dialog.current;
    if (d && !d.open) {
      d.showModal();
      input.current?.focus();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const d = dialog.current;
        if (d?.open) d.close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, [open]);

  function run(cmd: Command | undefined) {
    if (!cmd) return;
    dialog.current?.close();
    cmd.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Command palette"
      onClose={() => {
        setQuery("");
        setActive(0);
      }}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
      className="m-auto mt-[12vh] w-[min(92vw,34rem)] border border-line bg-surface p-0 text-bone backdrop:bg-black/70"
    >
      <div onKeyDown={onKeyDown}>
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Ketik perintah atau cari project..."
          aria-label="Cari perintah"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          className="w-full border-b border-line bg-transparent px-4 py-3 font-label text-sm outline-none placeholder:text-muted"
        />
        <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <li className="px-4 py-3 font-label text-xs text-muted">Tidak ada hasil.</li>
          ) : (
            results.map((c, i) => (
              <li
                key={c.id}
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2 ${
                  i === active ? "bg-red text-white" : ""
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`font-label text-[0.65rem] uppercase tracking-[0.15em] ${
                    i === active ? "text-white" : "text-muted"
                  }`}
                >
                  {c.group}
                </span>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-line px-4 py-2 font-label text-[0.65rem] uppercase tracking-[0.15em] text-muted">
          ↑↓ pilih · Enter jalankan · Esc tutup
        </p>
      </div>
    </dialog>
  );
}
