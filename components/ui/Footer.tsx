import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto max-w-5xl space-y-3 font-label text-xs leading-relaxed text-muted">
        <p>
          © {profile.copyrightYear} {profile.name}. Dibuat dengan Next.js.
        </p>
        <p>
          Visual dan siluet dibuat sendiri dengan SVG/CSS. {/* TODO: kredit fan art bila ada. */}
        </p>
        <p>
          Fan tribute. Black Clover © Yuki Tabata / Shueisha, TV Tokyo, Black Clover Project. Situs
          ini tidak berafiliasi.
        </p>
      </div>
    </footer>
  );
}
