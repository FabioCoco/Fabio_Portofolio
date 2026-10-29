import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Izinkan membuka dev server lewat IP LAN (mis. dari HP). Tanpa ini JS dev diblokir (403)
  // sehingga halaman tidak ter-hydrate dan tombol/animasi tidak jalan.
  allowedDevOrigins: ["192.168.56.1"],
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
