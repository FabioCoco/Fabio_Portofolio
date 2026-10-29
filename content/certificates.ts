export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  verifyUrl?: string; // link verifikasi / kredensial
  credentialId?: string;
  // Taruh gambar di public/certificates/, mis. "/certificates/nama-file.webp"
  image?: string;
};

// TODO: ganti dengan sertifikat asli. Tutup data sensitif pada gambar sebelum dipublikasikan.
export const certificates: Certificate[] = [
  {
    title: "TODO Nama Sertifikat 1",
    issuer: "TODO Penerbit",
    year: "2025",
    verifyUrl: "",
    credentialId: "",
    image: "",
  },
  {
    title: "TODO Nama Sertifikat 2",
    issuer: "TODO Penerbit",
    year: "2025",
    verifyUrl: "",
    credentialId: "",
    image: "",
  },
  {
    title: "TODO Nama Sertifikat 3",
    issuer: "TODO Penerbit",
    year: "2024",
    verifyUrl: "",
    credentialId: "",
    image: "",
  },
];
