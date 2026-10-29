// Garis tebasan diagonal yang sudah tergambar (state akhir / fallback reduced-motion).
// Animasi stroke-dashoffset ditambahkan di Fase 3.
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
        d="M104 -4 L-4 104"
        stroke="#e5252a"
        strokeWidth="1.6"
        strokeOpacity="0.35"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <path
        id="slash-core"
        d="M104 -4 L-4 104"
        stroke="#ece6d8"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}
