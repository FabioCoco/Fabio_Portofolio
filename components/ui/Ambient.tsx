// Latar bergerak pelan di belakang seluruh halaman: cahaya merah redup + partikel kecil yang naik.
// Murni CSS (lihat .ambient di globals.css); dimatikan otomatis saat prefers-reduced-motion.
const DOTS = [
  { x: 6, s: 4, t: 26, d: -4 },
  { x: 14, s: 3, t: 32, d: -18 },
  { x: 23, s: 5, t: 38, d: -9 },
  { x: 31, s: 3, t: 29, d: -22 },
  { x: 40, s: 4, t: 35, d: -2 },
  { x: 48, s: 3, t: 41, d: -14 },
  { x: 57, s: 5, t: 30, d: -26 },
  { x: 65, s: 3, t: 36, d: -7 },
  { x: 73, s: 4, t: 33, d: -19 },
  { x: 81, s: 3, t: 40, d: -11 },
  { x: 88, s: 5, t: 28, d: -24 },
  { x: 94, s: 3, t: 34, d: -5 },
];

export function Ambient() {
  return (
    <div aria-hidden="true" className="ambient">
      <span className="ambient-orb" />
      <span className="ambient-orb" />
      <span className="ambient-orb" />
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="ambient-dot"
          style={
            {
              "--x": `${d.x}%`,
              "--s": `${d.s}px`,
              "--t": `${d.t}s`,
              "--d": `${d.d}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
