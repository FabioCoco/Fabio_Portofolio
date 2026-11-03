import type { NextConfig } from "next";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Versi CV = waktu modifikasi file terbaru di public/cv. Dipakai sebagai ?v= pada link
// agar mengganti PDF dengan nama sama tidak tersangkut di cache browser/CDN.
function cvVersion() {
  try {
    const dir = join(process.cwd(), "public", "cv");
    return String(Math.max(...readdirSync(dir).map((f) => Math.floor(statSync(join(dir, f)).mtimeMs))));
  } catch {
    return "1";
  }
}

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_CV_VERSION: cvVersion() },
  /* config options here */
  // Izinkan membuka dev server lewat IP LAN (mis. dari HP). Tanpa ini JS dev diblokir (403)
  // sehingga halaman tidak ter-hydrate dan tombol/animasi tidak jalan.
  allowedDevOrigins: ["192.168.56.1"],
  // Gambar hasil optimasi disimpan lama di cache; header cache untuk aset statis di /public.
  images: { minimumCacheTTL: 60 * 60 * 24 * 30 },
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];
    const noCache = [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }];
    return [
      ...["projects", "certificates", "profile"].map((d) => ({ source: `/${d}/:path*`, headers: cache })),
      { source: "/cv/:path*", headers: noCache },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
