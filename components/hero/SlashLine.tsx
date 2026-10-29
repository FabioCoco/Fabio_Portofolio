// Garis tebasan diagonal. Tanpa JS / dengan prefers-reduced-motion, garis sudah tergambar
// (state akhir). Untuk animasi, CSS (.fx-slash di globals.css) menyembunyikannya lewat
// stroke-dashoffset dan HeroStage menggambarnya dengan GSAP.
export function SlashLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        id="slash-glow"
        className="fx-slash fx-slash-glow"
        d="M104 -4 L-4 104"
        pathLength={1}
        stroke="#e5252a"
        strokeWidth="1.1"
        strokeOpacity="0.35"
        fill="none"
      />
      <path
        id="slash-core"
        className="fx-slash fx-slash-core stroke-bone"
        d="M104 -4 L-4 104"
        pathLength={1}
        strokeWidth="0.3"
        fill="none"
      />
    </svg>
  );
}
