# Black Bulls Portfolio

Portofolio bertema Black Clover (fan tribute). Lihat `PLAN.md` untuk rencana lengkap dan `CLAUDE.md` untuk aturan proyek.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Mengisi konten

Semua konten ada di `content/*.ts` (cari tanda `TODO`):

| Data | File | Aset |
|---|---|---|
| Profil, kontak, link sosial | `content/profile.ts` | foto di `public/profile/`, CV di `public/cv.pdf` |
| Project (judul, stack, repo, demo) | `content/projects.ts` | screenshot di `public/projects/<slug>/` |
| Sertifikat | `content/certificates.ts` | gambar di `public/certificates/` |
| Skill | `content/skills.ts` | - |

## Deploy ke Vercel

1. Push repo ke GitHub, lalu import di Vercel (framework terdeteksi otomatis: Next.js).
2. Tambahkan Environment Variable `NEXT_PUBLIC_SITE_URL` = URL produksi (mis. `https://namaanda.vercel.app`), lalu redeploy.
3. Opsional: sambungkan custom domain di Settings > Domains.

## Pengaturan animasi

`lib/motion.ts`: `ENABLE_SMOOTH_SCROLL` mematikan Lenis. Semua animasi otomatis mati saat `prefers-reduced-motion`.
