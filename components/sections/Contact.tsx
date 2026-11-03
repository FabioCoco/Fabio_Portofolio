import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { CvMenu } from "@/components/ui/CvMenu";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

export function Contact() {
  const { github, linkedin, email } = profile.links;
  const icon = "grid h-10 w-10 place-items-center border border-line hover:border-red hover:text-accent";
  return (
    <section aria-labelledby="contact" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="contact" title="Hubungi Saya" subtitle="Kontak" />
        <p data-reveal className="max-w-xl text-lg leading-relaxed">
          Terbuka untuk magang, kolaborasi, dan ngobrol soal teknologi. Hubungi saya lewat:
        </p>
        <p data-reveal className="mt-4 font-label text-sm">{email}</p>
        <ul data-reveal className="mt-6 flex flex-wrap gap-3 font-label text-xs uppercase tracking-[0.15em]">
          <li>
            <CopyEmailButton email={email} />
          </li>
          <li>
            <a href={`mailto:${email}`} className={icon} aria-label="Kirim email" title="Kirim email">
              <MailIcon />
            </a>
          </li>
          <li>
            <a href={github} className={icon} aria-label="GitHub" title="GitHub">
              <GithubIcon />
            </a>
          </li>
          <li>
            <a href={linkedin} className={icon} aria-label="LinkedIn" title="LinkedIn">
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <CvMenu />
          </li>
        </ul>
      </div>
    </section>
  );
}
