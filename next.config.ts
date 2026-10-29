import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Izinkan membuka dev server lewat IP LAN (mis. dari HP). Tanpa ini JS dev diblokir (403)
  // sehingga halaman tidak ter-hydrate dan tombol/animasi tidak jalan.
  allowedDevOrigins: ["192.168.56.1"],
  // Gambar hasil optimasi disimpan lama di cache; header cache untuk aset statis di /public.
  images: { minimumCacheTTL: 60 * 60 * 24 * 30 },
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];
    return ["projects", "certificates", "profile"].map((d) => ({ source: `/${d}/:path*`, headers: cache }));
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
