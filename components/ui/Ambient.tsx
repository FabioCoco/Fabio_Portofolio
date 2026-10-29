import { LazyParticles } from "@/components/ui/LazyExtras";

// Latar bergerak pelan di belakang seluruh halaman: cahaya merah redup (CSS) dan partikel
// (canvas: konstelasi di tema terang, bara di tema malam). Mati otomatis saat prefers-reduced-motion.
export function Ambient() {
  return (
    <div aria-hidden="true" className="ambient">
      <span className="ambient-orb" />
      <span className="ambient-orb" />
      <span className="ambient-orb" />
      <LazyParticles />
    </div>
  );
}
