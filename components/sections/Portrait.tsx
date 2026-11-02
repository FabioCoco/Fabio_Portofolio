import Image from "next/image";
import { profile } from "@/content/profile";
import { Clover } from "@/components/ui/Clover";

// Section "Tentang Saya" (gabungan kenalan + profil): foto lengkung di samping teks, lalu nilai-nilai.
// Ringkasan, jurusan, dan tautan sosial sudah ada di Hero dan Kontak, jadi tidak diulang di sini.
// Tanpa profile.photo, teks tampil satu kolom. Crop foto diatur lewat photoPosition dan photoZoom.
export function Portrait() {
  const { about, values, semester, totalSemester, gpa } = profile;
  const facts = [
    { label: "Program studi", main: profile.major, sub: profile.university },
    semester !== undefined
      ? { label: "Semester", main: `${semester}/${totalSemester}`, sub: `Angkatan ${profile.intake}` }
      : null,
    gpa !== undefined ? { label: "IPK", main: gpa.toFixed(2), sub: "dari 4.00" } : null,
  ].filter((f) => f !== null);

  return (
    <section aria-labelledby="about" className="px-5 py-16">
      <div
        className={`mx-auto grid max-w-5xl items-center gap-12 border-t border-line pt-12 md:gap-16 ${
          profile.photo ? "md:grid-cols-[18rem_1fr]" : ""
        }`}
      >
        {profile.photo ? (
          <div data-pop className="mx-auto w-full max-w-[18rem]">
            <div className="fx-portrait relative">
              {/* Cincin putus-putus yang berputar pelan */}
              <span
                aria-hidden="true"
                className="fx-portrait-ring absolute -inset-5 rounded-full border border-dashed border-red/50"
              />
              {/* Lingkaran aksen berdenyut */}
              <span
                aria-hidden="true"
                className="fx-portrait-dot absolute -left-6 -top-6 h-24 w-24 rounded-full bg-red opacity-80"
              />
              {/* Bingkai merah, bergeser saat hover */}
              <span
                aria-hidden="true"
                className="fx-portrait-frame absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border-2 border-red"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-surface">
                <div className="fx-portrait-photo absolute inset-0">
                  <Image
                    src={profile.photo}
                    alt={`Foto ${profile.name}`}
                    fill
                    sizes="(min-width: 768px) 576px, 288px"
                    quality={90}
                    className="object-cover"
                    style={{
                      objectPosition: profile.photoPosition,
                      transform: `scale(${profile.photoZoom})`,
                      transformOrigin: profile.photoPosition,
                    }}
                  />
                </div>
              </div>
              <Clover className="absolute -bottom-4 -right-4 h-10 w-10 text-accent" />
            </div>
          </div>
        ) : null}

        <div data-reveal>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">Kenalan</p>
          <h2
            id="about"
            className="mt-3 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl"
          >
            Halo, saya {profile.name.split(" ")[0]}
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-xl leading-relaxed">
            {about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.label} className="fx-card border border-line bg-surface p-4">
                <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">{f.label}</p>
                <p className="mt-2 font-display text-2xl uppercase leading-tight tracking-wide">{f.main}</p>
                <p className="mt-1 text-sm text-muted">{f.sub}</p>
              </li>
            ))}
          </ul>

          {values.length > 0 ? (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <li key={v.title} className="fx-card border border-line bg-surface p-4">
                  <span className="font-display text-3xl leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-label text-xs uppercase tracking-[0.2em]">{v.title}</h3>
                  <p className="mt-1 text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
