import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

export function Contact() {
  const { github, linkedin, email, cv } = profile.links;
  const link = "border border-line px-4 py-2 hover:border-red hover:text-accent";
  return (
    <section aria-labelledby="contact" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="contact" title="Join the Squad" subtitle="Kontak" />
        <p data-reveal className="max-w-xl text-lg leading-relaxed">
          Terbuka untuk magang, kolaborasi, dan ngobrol soal teknologi. Hubungi saya lewat:
        </p>
        <p data-reveal className="mt-4 font-label text-sm">{email}</p>
        <ul data-reveal className="mt-6 flex flex-wrap gap-3 font-label text-xs uppercase tracking-[0.15em]">
          <li>
            <CopyEmailButton email={email} />
          </li>
          <li>
            <a href={`mailto:${email}`} className={`inline-block ${link}`}>
              Kirim email
            </a>
          </li>
          <li>
            <a href={github} className={`inline-block ${link}`}>
              GitHub
            </a>
          </li>
          <li>
            <a href={linkedin} className={`inline-block ${link}`}>
              LinkedIn
            </a>
          </li>
          {cv ? (
            <li>
              <a href={cv} className={`inline-block ${link}`}>
                Unduh CV
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
