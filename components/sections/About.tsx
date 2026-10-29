import Image from "next/image";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section aria-labelledby="about" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="about" file="FILE 03" title="Captain's Notes" subtitle="Tentang saya" />
        <div className="grid gap-8 md:grid-cols-[1fr_16rem]">
          <div className="space-y-4 text-lg leading-relaxed">
            {profile.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <ul className="grid gap-4 pt-4 sm:grid-cols-2">
              {profile.values.map((v) => (
                <li key={v.title} className="border-l-2 border-red pl-4">
                  <h3 className="font-label text-xs uppercase tracking-[0.2em]">{v.title}</h3>
                  <p className="mt-1 text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-3 font-label text-xs uppercase tracking-[0.15em] text-muted">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={`Foto ${profile.name}`}
                width={256}
                height={320}
                className="h-auto w-full border border-line object-cover"
              />
            ) : null}
            <p>{profile.university}</p>
            <p>{profile.major}</p>
            <p>{profile.year}</p>
            <p>{profile.location}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
