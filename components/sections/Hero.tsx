import Link from "next/link";
import { profile } from "@/content/profile";
import { HeroStage } from "@/components/hero/HeroStage";
import { SlashLine } from "@/components/hero/SlashLine";
import { YamiScene } from "@/components/hero/YamiScene";

// Isi hero tetap server component. Animasi tebasan ada di HeroStage (client).
export function Hero() {
  const social =
    "inline-block border border-line bg-bg/70 px-4 py-2 hover:border-red hover:text-accent";
  return (
    <HeroStage>
      <SlashLine />

      {/* Teks vertikal Jepang di tepi kanan */}
      <p
        lang="ja"
        aria-hidden="true"
        className="absolute right-3 top-24 z-10 font-jp text-3xl font-black tracking-[0.3em] text-accent [writing-mode:vertical-rl] sm:right-6 sm:text-5xl"
      >
        闇魔法
      </p>

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 pr-10 md:grid-cols-[1.1fr_0.9fr] md:pr-16">
        <div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted">
            {`Portofolio · ${profile.copyrightYear}`}
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.95] tracking-wide sm:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed">{profile.summary}</p>
          <p className="mt-5 font-label text-xs uppercase tracking-[0.2em] text-muted">
            {profile.major} · {profile.university} · {profile.location}
          </p>
          <p className="mt-8 font-display text-2xl uppercase tracking-wide text-accent sm:text-3xl">
            {profile.tagline}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 font-label text-xs uppercase tracking-[0.15em]">
            <li>
              <Link
                href="/projects"
                className="inline-block border border-red bg-red px-4 py-2 text-white hover:bg-red-deep"
              >
                Lihat project
              </Link>
            </li>
            <li>
              <a href={profile.links.github} className={social}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} className={social}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.links.email}`} className={social}>
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <YamiScene />
        </div>
      </div>
    </HeroStage>
  );
}
