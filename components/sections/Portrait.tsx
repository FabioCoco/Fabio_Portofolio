import Image from "next/image";
import { profile } from "@/content/profile";
import { Clover } from "@/components/ui/Clover";

// Section foto: potret berbentuk lengkung (bukan kotak) dengan bingkai bergeser dan lingkaran aksen.
// Disembunyikan selama profile.photo kosong. Crop diatur lewat photoPosition dan photoZoom.
export function Portrait() {
  if (!profile.photo) return null;
  const { semester, totalSemester, gpa, links } = profile;
  const facts = [
    [profile.major, profile.university],
    semester !== undefined ? [`Semester ${semester}/${totalSemester}`, `Angkatan ${profile.intake}`] : null,
    gpa !== undefined ? [`IPK ${gpa.toFixed(2)}`, "dari 4.00"] : null,
  ].filter((f): f is string[] => f !== null);
  const btn = "inline-block border border-line px-4 py-2 hover:border-red hover:text-accent";

  return (
    <section aria-labelledby="profil" className="px-5 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-12 border-t border-line pt-12 md:grid-cols-[18rem_1fr] md:gap-16">
        <div data-reveal className="relative mx-auto w-full max-w-[18rem]">
          {/* Lingkaran aksen dan bingkai bergeser di belakang foto */}
          <span
            aria-hidden="true"
            className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-red opacity-80"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border-2 border-red"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-surface">
            <Image
              src={profile.photo}
              alt={`Foto ${profile.name}`}
              fill
              sizes="18rem"
              className="object-cover"
              style={{
                objectPosition: profile.photoPosition,
                transform: `scale(${profile.photoZoom})`,
                transformOrigin: profile.photoPosition,
              }}
            />
          </div>
          <Clover className="absolute -bottom-4 -right-4 h-10 w-10 text-accent" />
        </div>

        <div data-reveal>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">Kenalan</p>
          <h2
            id="profil"
            className="mt-3 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl"
          >
            Halo, saya {profile.name.split(" ")[0]}
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed">{profile.summary}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {facts.map(([a, b]) => (
              <li key={a} className="border-l-2 border-red pl-3">
                <p className="font-label text-xs uppercase tracking-[0.15em]">{a}</p>
                <p className="mt-1 text-muted">{b}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-3 font-label text-xs uppercase tracking-[0.15em]">
            <li>
              <a href={links.github} className={btn}>
                GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin} className={btn}>
                LinkedIn
              </a>
            </li>
            {links.cv ? (
              <li>
                <a href={links.cv} className={btn}>
                  CV
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
