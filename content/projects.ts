export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  type: "Kuliah" | "Personal" | "Tim";
  /** Solo = dikerjakan sendiri; Kontributor = ikut mengembangkan project milik tim. */
  involvement: "Solo" | "Kontributor";
  year: string;
  demo?: string; // link demo (live)
  repo?: string; // link repository GitHub
  // Screenshot ada di public/projects/<slug>/, mis. "/projects/<slug>/1.webp"
  screenshots: string[];
  /** Tautan bukti/dokumentasi (mis. folder Drive), ditampilkan di bagian Peran. */
  docs?: { label: string; url: string };
  problem: string;
  solution: string;
  role: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "bakehouse",
    title: "BakeHouse",
    summary:
      "Toko roti artisan online berbasis MERN dengan dashboard admin, keranjang tersimpan di server, dan pembayaran Midtrans.",
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Zustand",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Midtrans",
    ],
    type: "Personal",
    involvement: "Solo",
    year: "2026",
    demo: "",
    repo: "https://github.com/FabioCoco/BakeHouse",
    screenshots: ["/projects/bakehouse/1.webp", "/projects/bakehouse/2.webp", "/projects/bakehouse/3.webp", "/projects/bakehouse/4.webp", "/projects/bakehouse/5.webp"],
    problem:
      "Toko roti artisan membutuhkan etalase online yang menangani katalog, checkout, pembayaran, dan pengelolaan pesanan dalam satu sistem.",
    solution:
      "Monorepo dengan server (Express + MongoDB) dan client (Vite + React). Pelanggan bisa mendaftar dengan email atau Google, menyimpan keranjang di server agar ikut ke perangkat lain (stok dicek ulang di tiap perubahan), lalu membayar lewat Midtrans Snap dengan jendela bayar 24 jam. Pesanan yang kedaluwarsa otomatis dibatalkan dan stoknya dikembalikan. Admin mendapat dashboard analitik 7/30/90 hari (pendapatan, produk terlaris, konversi pembayaran, stok menipis) serta pengelolaan produk, pesanan, kategori, ulasan, dan banner promo.",
    role: "Pengembang tunggal: merancang dan membangun backend maupun frontend.",
    result:
      "Aplikasi e-commerce utuh dari sisi pelanggan sampai admin, dilengkapi pengujian backend (Jest, Supertest) dan data seed untuk demo.",
  },
  {
    slug: "panda-belajar-mandarin",
    title: "Panda Belajar Mandarin",
    summary:
      "Aplikasi flashcard, kuis, dan pengulangan Leitner untuk belajar kosakata Mandarin, bertema panda dan tanpa backend.",
    stack: ["React", "Vite", "Tailwind CSS", "localStorage", "Web Speech API", "SVG", "Canvas"],
    type: "Personal",
    involvement: "Solo",
    year: "2026",
    demo: "",
    repo: "https://github.com/FabioCoco/Belajar_Mandarin",
    screenshots: ["/projects/panda-belajar-mandarin/1.webp", "/projects/panda-belajar-mandarin/2.webp", "/projects/panda-belajar-mandarin/3.webp", "/projects/panda-belajar-mandarin/4.webp"],
    problem:
      "Menghafal kosakata Mandarin membutuhkan latihan berulang yang terstruktur dan kemajuan yang bisa dipantau, sementara saya sendiri merasa kesulitan belajar tanpa alat seperti itu.",
    solution:
      "286 kata di 6 bab tema yang bisa dipelajari lewat flashcard dengan animasi balik 3D, kuis pilihan ganda tiga mode, dan sistem Leitner 3 kotak yang membuat kata sering salah lebih sering muncul. Ada tombol suara (Web Speech API), pencarian yang mengabaikan tanda nada, target harian, streak, halaman progress, dan mode terang/gelap. Progress disimpan di browser sehingga tidak butuh backend, dan maskot panda digambar sendiri sebagai komponen SVG.",
    role: "Pengembang tunggal: perancangan, UI/UX, dan seluruh kode.",
    result:
      "Aplikasi web statis yang siap dipakai: responsif dari 360 sampai 1440px, dapat dioperasikan dengan keyboard dan layar sentuh, serta kontras teks memenuhi WCAG AA.",
  },
  {
    slug: "dapute",
    title: "Dapute",
    summary:
      "E-commerce kue kering dan bakery artisan berbasis Laravel dan Livewire, dengan pembayaran Midtrans, ongkir Biteship, dan dashboard owner.",
    stack: [
      "Laravel 13",
      "Livewire 3",
      "Tailwind CSS 4",
      "PHP 8.3",
      "Supabase (PostgreSQL)",
      "Midtrans",
      "Biteship",
    ],
    type: "Tim",
    involvement: "Kontributor",
    year: "2026",
    demo: "",
    repo: "https://github.com/Llorente14/Dapute",
    screenshots: ["/projects/dapute/1.webp", "/projects/dapute/2.webp", "/projects/dapute/3.webp", "/projects/dapute/4.webp", "/projects/dapute/5.webp"],
    problem:
      "Brand kue kering made-to-order membutuhkan sistem yang menangani perjalanan pelanggan, mulai dari katalog, checkout, pembayaran online, sampai pelacakan pengiriman, plus dashboard operasional untuk owner dan admin logistik.",
    solution:
      "Aplikasi Laravel + Livewire dengan pola Action Class (satu class untuk satu use case bisnis). Ongkos kirim dihitung lewat Biteship, pembayaran lewat Midtrans Snap, dan webhook keduanya diverifikasi serta diproses secara idempotent. Admin mendapat antrian pesanan, manajemen produk dan role (owner, admin, customer), serta laporan keuangan bulanan yang bisa diekspor ke PDF dan Excel.",
    role: "Kontributor dalam tim: membantu pengembangan aplikasi (20 commit di repository tim).",
    docs: {
      label: "Bukti dokumentasi (Google Drive)",
      url: "https://drive.google.com/drive/folders/1mOuv46wUWMqGUvJysRoRUmVmKijs8DZ9?usp=sharing",
    },
    result:
      "Aplikasi dengan alur pemesanan end-to-end, dari katalog sampai pengiriman, dan laporan keuangan bulanan yang bisa diekspor.",
  },
];
