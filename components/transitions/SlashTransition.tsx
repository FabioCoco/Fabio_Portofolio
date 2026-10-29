// Pemisah diagonal antar section dengan garis tebasan merah yang tergambar saat di-scroll
// (digambar oleh ScrollEffects). Tanpa animasi, garisnya sudah tergambar.
export function SlashTransition({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-14 overflow-hidden bg-surface sm:h-24 ${flip ? "-scale-x-100" : ""}`}
    >
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polygon points="0,10 100,0 100,10" className="fill-bg" />
        <path
          data-slash-draw
          className="fx-draw"
          d="M-1 10.2 L101 -0.2"
          pathLength={1}
          stroke="#e5252a"
          strokeWidth="0.25"
          fill="none"
        />
      </svg>
    </div>
  );
}
