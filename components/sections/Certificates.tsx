import { certificates } from "@/content/certificates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificateSlip } from "@/components/ui/CertificateSlip";

const PREVIEW_COUNT = 4;

// Pratinjau di beranda; daftar lengkap ada di /certificates. Disembunyikan selama belum ada sertifikat.
export function Certificates() {
  if (certificates.length === 0) return null;
  return (
    <section aria-labelledby="certificates" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="certificates"
          title="Sertifikat"
          subtitle="Kredensial"
          action={{ href: "/certificates", label: "Lihat semua sertifikat →" }}
        />
        <ul className="grid gap-5 lg:grid-cols-2">
          {certificates.slice(0, PREVIEW_COUNT).map((c, i) => (
            <CertificateSlip key={`${c.title}-${i}`} cert={c} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
