import Image from "next/image";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { semester, totalSemester, gpa } = profile;
  const rows = [
    ["Nama", profile.name],
    ["Universitas", profile.university],
    ["Program studi", profile.major],
    ["Angkatan", profile.intake],
    ["Lokasi", profile.location],
  ];

  return (
    <section aria-labelledby="about" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="about" title="Captain's Notes" subtitle="Tentang saya" />
        <div className={`grid gap-10 ${profile.photo ? "md:grid-cols-[1fr_16rem]" : ""}`}>
          <div data-reveal className="space-y-8">
            <div className="space-y-4 text-lg leading-relaxed">
              {profile.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <dl className="border-t border-line">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="font-label text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
                  <dd className="text-lg">{value}</dd>
                </div>
              ))}
            </dl>

            {semester !== undefined || gpa !== undefined ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {semester !== undefined ? (
                  <div className="border border-line bg-surface p-5">
                    <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">Semester</p>
                    <p className="mt-2 font-display text-5xl">
                      {String(semester).padStart(2, "0")}
                      <span className="text-2xl text-muted">/{String(totalSemester).padStart(2, "0")}</span>
                    </p>
                    <div className="mt-3 flex gap-1.5" aria-hidden="true">
                      {Array.from({ length: totalSemester }, (_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 ${i < semester ? "bg-red" : "bg-line"}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
                {gpa !== undefined ? (
                  <div className="border border-line bg-surface p-5">
                    <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">IPK</p>
                    <p className="mt-2 font-display text-5xl">
                      {gpa.toFixed(2)}
                      <span className="text-2xl text-muted">/4.00</span>
                    </p>
                    <div className="mt-3 h-1.5 bg-line" aria-hidden="true">
                      <div className="h-full bg-red" style={{ width: `${(gpa / 4) * 100}%` }} />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {profile.values.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {profile.values.map((v) => (
                <li key={v.title} className="border-l-2 border-red pl-4">
                  <h3 className="font-label text-xs uppercase tracking-[0.2em]">{v.title}</h3>
                  <p className="mt-1 text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
            ) : null}
          </div>

          {profile.photo ? (
            <aside data-reveal>
              <Image
                src={profile.photo}
                alt={`Foto ${profile.name}`}
                width={256}
                height={320}
                className="h-auto w-full border border-line object-cover"
              />
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
