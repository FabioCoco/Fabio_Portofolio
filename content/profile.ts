export const profile = {
  name: "Fabio Francisco",
  copyrightYear: 2026, // TODO: perbarui tiap tahun
  tagline: "Membangun solusi teknologi yang rapi dan berguna.",
  summary:
    "Mahasiswa Informatics Engineering di Universitas Tarumanagara yang tertarik pada teknologi dan AI.",
  university: "Universitas Tarumanagara",
  major: "Informatics Engineering",
  // Semester sekarang dari total semester. Kosongkan (undefined) untuk menyembunyikan kartu.
  semester: 5 as number | undefined,
  totalSemester: 8,
  // IPK. Kosongkan (undefined) untuk menyembunyikan kartu.
  gpa: 3.75 as number | undefined,
  intake: "2024", // angkatan
  location: "Jakarta, Indonesia",
  about: [
    "Saya mahasiswa Teknik Informatika angkatan 2024 yang memiliki ketertarikan di bidang teknologi dan AI.",
    "Saat ini saya sedang mendalami bahasa Mandarin dan MongoDB.",
  ],
  // Opsional: nilai kerja ({ title, text }). Kosongkan untuk menyembunyikan bagian ini.
  values: [] as { title: string; text: string }[],
  // Taruh foto di public/profile/, mis. "/profile/foto.webp". Kosongkan jika tidak ada
  // (section foto otomatis disembunyikan).
  photo: "/profile/foto.webp",
  // Atur crop: titik fokus (x% y%, 50% 20% = tengah-atas) dan zoom (1 = tanpa zoom).
  photoPosition: "50% 50%",
  photoZoom: 1,
  links: {
    github: "https://github.com/FabioCoco",
    linkedin: "https://www.linkedin.com/in/fabio-francisco-49454029a/",
    email: "fabiofrans.work@gmail.com",
    // Taruh CV di public/cv.pdf lalu isi "/cv.pdf". Kosongkan jika tidak ada.
    cv: "",
  },
};
