# CLAUDE.md

Proyek: portofolio "Black Bulls" (tema Black Clover, fokus Yami Sukehiro). Baca `PLAN.md` sebelum mengerjakan apa pun. Kerjakan satu fase per permintaan.

## Aturan keras (jangan dilanggar)

1. **Dilarang memakai aset resmi** (artwork, screenshot anime, PV, logo resmi, model dari game). Jangan hotlink dari bclover.jp.
2. Semua visual dibuat sendiri: SVG, CSS, canvas/WebGL, atau ilustrasi/model yang punya lisensi jelas. Fan art wajib dikreditkan di footer.
3. Footer wajib memuat disclaimer: "Fan tribute. Black Clover © Yuki Tabata / Shueisha, TV Tokyo, Black Clover Project. Situs ini tidak berafiliasi."
4. **Konten adalah prioritas.** Tema tidak boleh menyulitkan orang menemukan project dan kontak.
5. Hormati `prefers-reduced-motion`: semua animasi berat harus punya versi statis.
6. Teks body wajib lolos kontras WCAG AA. Merah hanya untuk judul, aksen, dan elemen interaktif, bukan paragraf panjang.
7. Setelah tiap fase: jalankan `npm run lint`, `npx tsc --noEmit`, dan `npm run build`. Jangan lanjut kalau gagal.

## Konvensi

- Stack: Next.js (App Router) + TypeScript, Tailwind CSS v4, GSAP (fase animasi), deploy Vercel.
- Warna lewat token CSS di `app/globals.css` (`bg-bg`, `bg-surface`, `border-line`, `text-red`, `text-bone`, `text-muted`). Jangan hardcode hex di komponen.
- Font lewat `next/font` di `app/layout.tsx`: `font-display` (Anton), `font-body` (Crimson Pro), `font-label` (JetBrains Mono), `font-jp` (Noto Serif JP).
- Konten (project, sertifikat, skill, profil) disimpan di `content/*.ts`, bukan di komponen. Placeholder wajib ditandai `TODO`.
- Next.js di repo ini adalah versi baru; baca `node_modules/next/dist/docs/` bila ragu soal API (lihat `AGENTS.md`).
