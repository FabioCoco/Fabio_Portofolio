import type { Certificate } from "@/content/certificates";

function initials(name: string) {
  return name
    .split(/[\s/&-]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Kartu sertifikat berbentuk "slip": stub di kiri (monogram penerbit + nomor), garis putus-putus, lalu detail.
export function CertificateSlip({ cert, index }: { cert: Certificate; index: number }) {
  const isCredly = cert.verifyUrl?.includes("credly.com");
  const link =
    "font-label text-xs uppercase tracking-[0.15em] text-accent underline underline-offset-4 hover:text-bone";
  return (
    <li data-reveal className="fx-card flex border border-line bg-surface">
      <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-3 px-2 py-5 sm:w-28">
        <span
          aria-hidden="true"
          className="grid h-14 w-14 -rotate-3 place-items-center bg-red font-display text-xl uppercase text-white"
        >
          {initials(cert.issuer)}
        </span>
        <span className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          No. {String(index + 1).padStart(3, "0")}
        </span>
      </div>
      <div className="relative w-0 border-l border-dashed border-line">
        <span aria-hidden="true" className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-bg" />
        <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-bg" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <p className="flex justify-between gap-3 font-label text-xs uppercase tracking-[0.2em] text-muted">
          <span>{cert.issuer}</span>
          <span className="shrink-0">{cert.date}</span>
        </p>
        <h3 className="mt-2 font-display text-2xl uppercase leading-snug tracking-wide">{cert.title}</h3>
        {cert.credentialId ? (
          <p className="mt-1 font-label text-xs text-muted">ID: {cert.credentialId}</p>
        ) : null}
        {cert.verifyUrl || cert.image ? (
          <div className="mt-auto flex gap-4 pt-4">
            {cert.verifyUrl ? (
              <a href={cert.verifyUrl} className={link}>
                {isCredly ? "Lihat di Credly" : "Verifikasi"}
              </a>
            ) : null}
            {cert.image ? (
              <a href={cert.image} className={link}>
                Lihat gambar
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}
