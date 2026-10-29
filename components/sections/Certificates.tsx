import Image from "next/image";
import { certificates } from "@/content/certificates";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Certificates() {
  return (
    <section aria-labelledby="certificates" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="certificates"
          file="FILE 05"
          title="Grimoire Pages"
          subtitle="Sertifikat"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <li key={c.title} className="flex flex-col border border-line bg-surface">
              <div className="relative aspect-[4/3] border-b border-line bg-bg">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`Sertifikat ${c.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-label text-xs uppercase tracking-[0.2em] text-muted">
                    Gambar belum ada
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">
                  {c.issuer} · {c.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug">{c.title}</h3>
                {c.credentialId ? (
                  <p className="mt-1 font-label text-xs text-muted">ID: {c.credentialId}</p>
                ) : null}
                {c.verifyUrl ? (
                  <a
                    href={c.verifyUrl}
                    className="mt-auto pt-4 font-label text-xs uppercase tracking-[0.15em] text-red underline underline-offset-4 hover:text-bone"
                  >
                    Verifikasi
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
