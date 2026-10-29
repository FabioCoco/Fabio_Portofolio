import type { Metadata } from "next";
import Link from "next/link";
import { certificates } from "@/content/certificates";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { CertificateSlip } from "@/components/ui/CertificateSlip";
import { Clover } from "@/components/ui/Clover";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Sertifikat dan kredensial, lengkap dengan link verifikasi.",
};

export default function CertificatesPage() {
  return (
    <>
      <ScrollEffects />
      <Nav home={false} current="certificates" />
      <main id="main" className="flex-1 px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="font-label text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
          >
            ← Kembali ke beranda
          </Link>

          <header className="mb-12 mt-12">
            <p className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-muted">
              Credentials
              <Clover className="h-3.5 w-3.5 text-accent" />
              <span aria-hidden="true" className="h-px w-10 bg-line" />
              {certificates.length} sertifikat
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-none tracking-wide sm:text-9xl">
              Certificates
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Kursus dan kredensial yang pernah saya selesaikan. Buka gambar sertifikat, atau lihat
              badge Credly untuk verifikasi.
            </p>
          </header>

          {certificates.length > 0 ? (
            <ul className="grid gap-5 lg:grid-cols-2">
              {certificates.map((c, i) => (
                <CertificateSlip key={`${c.title}-${i}`} cert={c} index={i} />
              ))}
            </ul>
          ) : (
            <p className="border border-dashed border-line p-8 font-label text-xs uppercase tracking-[0.2em] text-muted">
              Sertifikat akan segera ditambahkan.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
