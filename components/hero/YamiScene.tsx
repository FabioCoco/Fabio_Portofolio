// Siluet pendekar original (Tier A) untuk hero. Bukan replika artwork resmi:
// jubah hitam berkibar, katana, postur siap menebas, seringai/mata merah kecil.
// Versi statis (Fase 2). Id dan class pada grup dipakai untuk animasi di Fase 3.
export function YamiScene() {
  return (
    <svg
      viewBox="0 0 440 600"
      role="img"
      aria-label="Siluet pendekar berjubah hitam dengan katana dalam postur menebas"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8f1217" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#8f1217" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8f1217" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Lingkaran merah redup di belakang karakter */}
      <circle id="hero-moon" cx="230" cy="280" r="205" fill="url(#moon)" />

      {/* Garis tanah */}
      <path d="M20 566 H420" stroke="#2a2a2e" strokeWidth="2" />

      <g id="hero-figure" fill="#000" stroke="#2a2a2e" strokeWidth="1.5" strokeLinejoin="round">
        {/* Jubah berkibar ke belakang (kiri), tepi bergerigi */}
        <path
          id="hero-cape"
          d="M198 198 C160 186 100 196 28 236 L62 246 L18 290 L66 292 L40 336 L100 322 L76 372 L140 336 C176 318 206 296 214 272 Z"
        />
        {/* Kaki belakang (terentang ke kiri) */}
        <path d="M184 330 L214 338 L158 450 L112 566 L64 566 L82 548 L132 440 Z" />
        {/* Kaki depan (menekuk ke kanan) */}
        <path d="M204 330 L236 322 L286 410 L304 566 L252 566 L254 548 L238 420 Z" />
        {/* Torso condong ke depan */}
        <path d="M172 204 L228 196 L252 262 L238 342 L182 346 L168 276 Z" />
        {/* Kepala dengan rambut runcing dan ikat kepala */}
        <path d="M184 170 L180 140 L194 152 L200 126 L212 148 L224 130 L228 156 L240 150 L232 176 C228 196 190 196 184 170 Z" />
        <path d="M184 160 L232 156 L233 164 L185 169 Z" fill="#141416" />
        <path d="M184 163 L150 152 L162 168 L148 178 L184 170 Z" />
        {/* Lengan belakang dan depan menuju gagang katana */}
        <path d="M232 214 L268 240 L260 254 L222 230 Z" />
        <path d="M222 224 L262 252 L254 264 L212 238 Z" />
      </g>

      {/* Mata dan seringai merah kecil */}
      <g id="hero-eye" stroke="#e5252a" strokeLinecap="round" fill="none">
        <path d="M208 168 L222 166" strokeWidth="3" />
        <path d="M206 184 Q216 190 226 182" strokeWidth="1.8" />
      </g>

      {/* Katana: bilah panjang diagonal, tsuba, gagang */}
      <g id="hero-katana">
        <path d="M266 244 L424 28 L428 34 L272 254 Z" fill="#ece6d8" />
        <path d="M272 254 L424 34" stroke="#9a958a" strokeWidth="1" />
        <circle cx="268" cy="250" r="9" fill="#000" stroke="#ece6d8" strokeWidth="1.5" />
        <path d="M262 258 L236 292 L246 298 L270 264 Z" fill="#000" stroke="#2a2a2e" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
