# Portfolio 
## Teknologi

- Next.js 16 (App Router) dan TypeScript
- Tailwind CSS v4
- GSAP dan Lenis untuk animasi dan scroll
- Tema terang dan gelap, serta mengikuti `prefers-reduced-motion`

## Fitur

- Hero beranimasi dengan siluet SVG buatan sendiri
- Halaman terpisah untuk project (dengan halaman detail) dan sertifikat
- Pratinjau sertifikat dalam dialog, dengan tautan verifikasi Credly
- Command palette (Ctrl+K) untuk berpindah halaman dan membuka tautan
- Metadata dan gambar Open Graph untuk berbagi tautan

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
```

Pemeriksaan sebelum deploy:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Struktur

| Folder | Isi |
|---|---|
| `app/` | Halaman dan layout |
| `components/` | Komponen UI, section, dan hero |
| `content/` | Data profil, project, sertifikat, dan skill |
| `lib/` | Helper animasi, scroll, dan preferensi |
| `public/` | Gambar project, sertifikat, dan foto profil |

## Mengubah konten

Semua teks dan data ada di `content/`, bukan di komponen.

| Data | File | Aset |
|---|---|---|
| Profil dan kontak | `content/profile.ts` | Foto di `public/profile/`, CV di `public/cv.pdf` |
| Project | `content/projects.ts` | Screenshot di `public/projects/<slug>/` |
| Sertifikat | `content/certificates.ts` | Gambar di `public/certificates/` |
| Skill | `content/skills.ts` | - |


## Catatan

Ilustrasi dan ornamen dibuat sendiri dengan SVG dan CSS. Tema visualnya terinspirasi dari Black Clover sebagai fan tribute; Black Clover © Yuki Tabata / Shueisha, TV Tokyo, Black Clover Project. Situs ini tidak berafiliasi.
