# PLAN: Portofolio "Black Bulls" (tema Black Clover, fokus Yami Sukehiro)

Dokumen ini dipakai sebagai `PLAN.md` / basis `CLAUDE.md` di root repo. Claude Code wajib membacanya sebelum mengerjakan apa pun.

---

## 1. Ringkasan

Portofolio pribadi seorang mahasiswa Informatics Engineering (Jakarta) yang menampilkan **project** dan **sertifikat**. Tema visual: fan tribute Black Clover dengan Yami Sukehiro (kapten Black Bulls) sebagai karakter utama.

- **Metafora utama:** "Black Bulls Member File". Pengunjung membaca berkas anggota; project = *mission log*; skill = *mana stats*.
- **Bahasa visual:** tebasan katana, transisi diagonal, tinta hitam, aksen merah terang, tipografi besar yang tegas.
- **Tagline:** "限界を、斬り開け" (*tebas batas dirimu*), dengan terjemahan Inggris kecil di bawahnya.
- **Referensi:**
  - bclover.jp/en: dasar hitam, slogan Jepang besar, kesan tegas.
  - mipotoforio.vercel.app (portofolio bertema Conan): struktur halaman, tipografi condensed besar, teks vertikal Jepang di tepi, label kecil bergaya arsip ("FILE 01"), tombol tema, pintasan Ctrl+K.

## 2. Aturan keras (jangan dilanggar)

1. **Dilarang memakai aset resmi** (artwork, screenshot anime, PV, logo resmi, model dari game). Jangan hotlink dari bclover.jp.
2. Semua visual dibuat sendiri: SVG, CSS, canvas/WebGL, atau ilustrasi/model yang punya lisensi jelas. Fan art wajib dikreditkan di footer.
3. Tambahkan disclaimer di footer: "Fan tribute. Black Clover © Yuki Tabata / Shueisha, TV Tokyo, Black Clover Project. Situs ini tidak berafiliasi."
4. **Konten adalah prioritas.** Tema tidak boleh menyulitkan orang menemukan project dan kontak.
5. Hormati `prefers-reduced-motion`: semua animasi berat harus punya versi statis.
6. Teks body wajib lolos kontras WCAG AA. Merah hanya untuk judul, aksen, dan elemen interaktif, bukan paragraf panjang.
7. Setelah tiap fase: jalankan `lint`, `typecheck`, dan `build`. Jangan lanjut kalau gagal.

## 3. Stack

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Mudah deploy ke Vercel, ekosistem besar |
| Styling | Tailwind CSS + CSS variables untuk token | Cepat, konsisten |
| Animasi | GSAP + ScrollTrigger | Kontrol penuh untuk tebasan dan transisi |
| Smooth scroll | Lenis (opsional, bisa dimatikan) | Rasa scroll premium |
| 3D (opsional, Fase 6) | react-three-fiber + drei | Hanya jika punya model `.glb` berlisensi |
| Konten | File `content/*.ts` atau MDX | Project dan sertifikat mudah diedit tanpa menyentuh komponen |
| Deploy | Vercel | Gratis, preview per branch |

Alternatif kalau mau lebih ringan: Astro. Tapi untuk animasi interaktif banyak, Next.js lebih praktis.

## 4. Sitemap dan section

Satu halaman (scroll) dengan nav sticky, plus halaman detail per project.

1. **Hero** ("FILE 01 / Black Bulls Member File"): nama besar, satu kalimat deskripsi, link GitHub/LinkedIn/Email, scene Yami menebas (lihat bagian 6).
2. **Work** ("Mission Log"): kartu project. Tiap kartu: judul, ringkasan satu kalimat, tech stack, link demo/repo. Hover memunculkan efek tebasan merah. Halaman detail: masalah, solusi, peran, hasil, screenshot.
3. **About** ("Captain's Notes"): cerita singkat, nilai-nilai kerja (analogi ringan ke Yami: kerja keras, tidak menyerah), foto opsional, lokasi.
4. **Skills** ("Mana Stats"): bar atau grid skill, dikelompokkan (Frontend, Backend, Tools). Jangan berlebihan: tampilkan yang benar-benar dikuasai.
5. **Certificates** ("Grimoire Pages"): kartu sertifikat dengan nama, penerbit, tahun, link verifikasi.
6. **Contact** ("Join the Squad"): email, GitHub, LinkedIn, tombol salin email.
7. **Footer**: kredit, disclaimer fan tribute, tahun.

Fitur tambahan: tombol tema (Night default / Light opsional), command palette `Ctrl+K`, teks vertikal Jepang di tepi kanan (mis. 闇魔法), kursor jejak tebasan (hanya desktop, bisa dimatikan).

## 5. Design tokens

```
--bg:        #0a0a0b   /* hitam dasar */
--surface:   #141416   /* kartu */
--line:      #2a2a2e   /* garis tipis */
--red:       #e5252a   /* aksen utama, merah terang */
--red-deep:  #8f1217   /* bayangan/hover */
--bone:      #ece6d8   /* teks utama, putih tulang */
--muted:     #9a958a   /* teks sekunder */
```

Tipografi (Google Fonts, `next/font`):
- Display: condensed tebal (Anton atau Bebas Neue), huruf kapital, ukuran sangat besar di hero.
- Body: serif nyaman dibaca (Crimson Pro atau Noto Serif).
- Label kecil: mono atau sans kapital dengan letter-spacing lebar (JetBrains Mono / Space Mono).
- Jepang: Noto Serif JP atau Zen Antique. Pastikan font di-subset supaya ringan.

Elemen dekoratif: tekstur noise tipis, garis diagonal, siluet clover empat daun (SVG buatan sendiri), lingkaran besar merah redup di belakang karakter (analog bulan di referensi, tapi merah gelap).

## 6. Scene hero: Yami menebas

Skill yang dipakai: sihir kegelapan Yami dengan katana (tebasan dimensi). Kanji pendukung yang aman: 闇魔法. Jika ingin nama jurus, verifikasi ejaan kanji-nya dulu dari sumber resmi sebelum dipasang.

Batas kemampuan: Claude Code menulis kode. Ia bisa membuat **siluet vektor stylized** dan **seluruh efek tebasan/animasi**, tapi tidak membuat model karakter 3D detail dan mirip secara akurat dari nol. Karena itu scene dibuat bertingkat:

### Tier A: Siluet SVG + efek kode (WAJIB, dibuat duluan)
- Siluet pendekar original: jubah hitam berkibar, katana, postur siap menebas, mata/seringai merah kecil sebagai detail. Gaya flat/ink, bukan replika wajah.
- Animasi (GSAP timeline), dipicu saat load, lalu bisa diulang dengan klik/hover:
  1. Idle: jubah bergoyang halus, partikel debu gelap melayang.
  2. Charge: aura gelap menebal di sekitar katana, vignette menutup.
  3. Slash: garis tebasan diagonal merah-putih tergambar cepat (`stroke-dashoffset`), flash singkat, layar bergetar 150 ms.
  4. Split: bagian layar terbelah sepanjang garis diagonal (`clip-path`), dua sisi bergeser tipis lalu menutup.
  5. Aftermath: retakan gelap + teks 闇魔法 muncul dan memudar.
- Versi `prefers-reduced-motion`: gambar statis dengan garis tebasan sudah tergambar.

### Tier B: Ilustrasi 2D berlisensi (upgrade)
- Pakai ilustrasi cutout PNG/WebP/SVG milik sendiri atau hasil komisi (atau fan art dengan izin dan kredit).
- Kode yang sama dari Tier A menempel di atasnya (tebasan, split, partikel, parallax mouse).

### Tier C: Model 3D `.glb` (opsional, paling berat)
- Hanya jika sudah punya model berlisensi (dibuat sendiri di Blender, dikomisi, atau lisensi yang jelas membolehkan). **Dilarang memakai model hasil ekstrak dari game.**
- react-three-fiber + material cel-shaded (toon + outline), animasi dari file atau prosedural.
- Wajib ada fallback ke Tier A/B untuk perangkat lemah dan mobile.

## 7. Struktur folder

```
/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ work/[slug]/page.tsx
├─ components/
│  ├─ hero/ (YamiScene.tsx, SlashLine.tsx, Particles.tsx)
│  ├─ sections/ (Work.tsx, About.tsx, Skills.tsx, Certificates.tsx, Contact.tsx)
│  ├─ ui/ (Nav.tsx, ThemeToggle.tsx, CommandPalette.tsx, SlashCursor.tsx)
│  └─ transitions/ (SlashTransition.tsx)
├─ content/ (projects.ts, certificates.ts, skills.ts, profile.ts)
├─ lib/ (gsap.ts, motion.ts)
├─ public/ (og.png, fonts bila perlu)
└─ PLAN.md  CLAUDE.md
```

## 8. Fase pengerjaan

Tiap fase = satu sesi/PR kecil. Review hasil sebelum lanjut.

**Fase 0: Setup.** Inisialisasi Next.js + TS + Tailwind, pasang font, token warna, `CLAUDE.md` berisi aturan bagian 2. Tidak ada UI selain halaman kosong bertema.

**Fase 1: Kerangka dan konten.** Nav, footer, semua section dengan konten asli dari `content/*.ts`, belum ada animasi. Responsif mobile-first. Semua halaman sudah bisa dibaca penuh.

**Fase 2: Hero statis.** Tipografi nama besar, lingkaran merah, siluet SVG Tier A (statis), link sosial, teks vertikal Jepang.

**Fase 3: Animasi hero.** Timeline tebasan (bagian 6 Tier A), reduced-motion fallback, tombol "ulang tebasan".

**Fase 4: Animasi section.** Reveal saat scroll, hover kartu project (garis tebasan), transisi diagonal antar section, Lenis (opsional).

**Fase 5: Polish fitur.** Theme toggle, Ctrl+K, kursor tebasan (desktop), halaman detail project, metadata/OG image.

**Fase 6 (opsional): Upgrade karakter.** Tier B atau C jika aset sudah tersedia.

**Fase 7: QA dan deploy.** Lighthouse (target Performance 85+ di mobile), cek kontras, uji di HP asli, keyboard navigation, deploy Vercel, custom domain bila ada.

## 9. Prompt siap pakai untuk Claude Code

**Fase 0**
> Baca PLAN.md. Kerjakan Fase 0 saja: setup Next.js (App Router, TypeScript, Tailwind), pasang font dan design tokens dari bagian 5, buat CLAUDE.md dari aturan bagian 2. Jangan mengerjakan fase lain. Jalankan lint dan build di akhir.

**Fase 1**
> Kerjakan Fase 1 dari PLAN.md. Gunakan data di content/*.ts (saya akan mengisi project dan sertifikat; sementara pakai placeholder yang jelas bertanda TODO). Mobile-first, tanpa animasi dulu.

**Fase 2 dan 3**
> Kerjakan Fase 2, lalu setelah saya setuju, Fase 3. Untuk siluet pendekar, buat SVG original (jubah hitam, katana, postur menebas), bukan meniru artwork resmi. Timeline GSAP mengikuti urutan idle, charge, slash, split, aftermath di bagian 6. Sediakan fallback reduced-motion.

**Fase 4 sampai 7**
> Kerjakan fase berikutnya sesuai PLAN.md, satu fase per permintaan. Tunjukkan ringkasan perubahan dan hal yang perlu saya cek manual.

## 10. Checklist konten yang harus disiapkan pengguna

- [ ] Nama tampilan, kalimat deskripsi singkat, kampus, lokasi
- [ ] Link GitHub, LinkedIn, email
- [ ] Daftar project: judul, ringkasan 1 kalimat, tech stack, link demo/repo, 1-3 screenshot, peran dan hasil
- [ ] Daftar sertifikat: nama, penerbit, tahun, link verifikasi, gambar (opsional)
- [ ] Daftar skill yang benar-benar dikuasai
- [ ] Foto profil (opsional)
- [ ] Keputusan karakter: Tier A saja, atau ada ilustrasi/model berlisensi untuk Tier B/C

## 11. Definisi selesai

- Semua section terisi konten asli, tanpa placeholder.
- Hero menampilkan tebasan yang halus di desktop dan tetap ringan di HP.
- Lighthouse mobile: Performance 85+, Accessibility 95+.
- Tidak ada aset resmi Black Clover di repo.
- Footer berisi kredit dan disclaimer.
- Live di Vercel dan link bisa dibagikan.
