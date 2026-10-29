import { profile } from "@/content/profile";

// Hero sementara: hanya teks. Scene Yami dikerjakan di Fase 2-3.
export function Hero() {
  return (
    <section id="top" aria-label="Perkenalan" className="px-5 pb-16 pt-14 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-muted">
          FILE 01 / Black Bulls Member File
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.95] tracking-wide sm:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed">{profile.summary}</p>
        <p className="mt-6 font-label text-xs uppercase tracking-[0.2em] text-muted">
          {profile.major} · {profile.university} · {profile.location}
        </p>
        <p lang="ja" className="mt-8 font-jp text-2xl font-semibold text-red">
          {profile.tagline}
        </p>
        <p className="font-label text-xs text-muted">{profile.taglineEn}</p>
        <ul className="mt-8 flex flex-wrap gap-3 font-label text-xs uppercase tracking-[0.15em]">
          <li>
            <a
              href="#work"
              className="inline-block border border-red bg-red px-4 py-2 text-bone hover:bg-red-deep"
            >
              Lihat project
            </a>
          </li>
          <li>
            <a href={profile.links.github} className="inline-block border border-line px-4 py-2 hover:border-red hover:text-red">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} className="inline-block border border-line px-4 py-2 hover:border-red hover:text-red">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.links.email}`} className="inline-block border border-line px-4 py-2 hover:border-red hover:text-red">
              Email
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
