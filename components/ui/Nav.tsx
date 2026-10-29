import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PaletteTrigger } from "@/components/ui/PaletteTrigger";

type Current = "projects" | "certificates";

// `home` = false di halaman selain beranda: tautan section (About, Contact) diarahkan ke "/#id".
// `current` menandai halaman aktif (Projects / Certificates).
export function Nav({ home = true, current }: { home?: boolean; current?: Current }) {
  const base = home ? "" : "/";
  const link = "py-1 hover:text-accent";
  const active = "text-bone underline underline-offset-4 decoration-red";
  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
        <Link href="/" className="font-display text-xl uppercase tracking-wide">
          Fabio <span className="text-accent">Francisco</span>
        </Link>
        <ul className="order-3 flex w-full flex-wrap gap-x-4 gap-y-1 font-label text-[0.7rem] uppercase tracking-[0.15em] text-muted sm:order-none sm:w-auto sm:gap-x-6 sm:text-xs">
          <li>
            <Link
              href="/projects"
              aria-current={current === "projects" ? "page" : undefined}
              className={`${link} ${current === "projects" ? active : ""}`}
            >
              Projects
            </Link>
          </li>
          <li>
            <a href={`${base}#about`} className={link}>
              About
            </a>
          </li>
          <li>
            <Link
              href="/certificates"
              aria-current={current === "certificates" ? "page" : undefined}
              className={`${link} ${current === "certificates" ? active : ""}`}
            >
              Certificates
            </Link>
          </li>
          <li>
            <a href={`${base}#contact`} className={link}>
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <PaletteTrigger />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
