// Siluet pendekar original (Tier A) untuk hero. Bukan replika artwork resmi:
// pendekar berjubah hitam, ikat kepala, katana melengkung, kuda-kuda menebas, mata merah.
// Menghadap kiri: katana terangkat di belakang kepala, lalu menebas turun ke kiri-bawah
// (searah garis tebasan hero). Id grup dipakai oleh timeline GSAP di HeroStage:
// hero-figure > hero-cape, hero-leg-*, hero-torso > hero-arm (lengan + katana + aura), hero-head.
export function YamiScene() {
  return (
    <svg
      viewBox="0 -50 460 650"
      role="img"
      aria-label="Siluet pendekar berjubah hitam dengan katana dalam postur menebas"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <radialGradient id="moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8f1217" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#8f1217" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8f1217" stopOpacity="0.35" />
        </radialGradient>
        <linearGradient id="ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1b20" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="blade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4efe2" />
          <stop offset="1" stopColor="#a9a496" />
        </linearGradient>
        <filter id="aura-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Lingkaran merah redup di belakang karakter */}
      <circle id="hero-moon" cx="230" cy="290" r="205" fill="url(#moon)" />

      <g
        id="hero-figure"
        fill="url(#ink)"
        stroke="#6b1317"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Jubah berkibar ke belakang (kanan), tepi bergerigi */}
        <g id="hero-cape">
          <path d="M232 196 C290 176 360 188 446 238 L402 248 L454 294 L398 296 L432 346 L360 330 L390 388 L306 344 C278 322 258 300 246 270 Z" />
          <path
            d="M262 214 C318 214 372 240 420 268 M270 250 C320 262 366 290 404 322 M268 280 C304 296 336 320 362 350"
            fill="none"
            stroke="#24242b"
            strokeWidth="2"
          />
        </g>

        {/* Kaki belakang (terentang ke kanan) */}
        <path
          id="hero-leg-back"
          d="M236 336 L272 340 C292 380 316 430 336 496 L346 566 L308 566 L304 550 C288 502 262 448 232 400 Z"
        />
        <path d="M304 566 L346 566 L366 572 L296 572 Z" stroke="none" fill="#000" />

        {/* Kaki depan (menekuk ke kiri) */}
        <path
          id="hero-leg-front"
          d="M206 332 L252 340 C236 376 206 404 170 424 L176 548 L196 556 L200 566 L112 566 L116 548 L132 544 L124 440 C150 392 184 360 206 332 Z"
        />
        {/* Lipatan hakama */}
        <path
          d="M214 372 C226 392 224 410 214 430 M244 366 C250 390 262 410 270 426"
          fill="none"
          stroke="#24242b"
          strokeWidth="2"
        />

        {/* Badan atas: torso, lengan + katana, lalu kepala (kepala di atas lengan agar wajah terlihat) */}
        <g id="hero-torso">
          <path d="M158 224 C174 192 244 184 272 206 L274 262 C264 300 254 326 254 350 L208 354 C196 316 168 272 158 224 Z" />
          <path d="M210 198 L234 270 L256 202" fill="none" stroke="#24242b" strokeWidth="2.4" />
          <path d="M204 340 L262 346" stroke="#7a1519" strokeWidth="5" fill="none" />

          <g id="hero-arm">
            {/* Aura gelap-merah di sepanjang bilah (tersembunyi; muncul saat charge) */}
            <path
              className="hero-aura"
              d="M300 122 L440 -34"
              stroke="#e5252a"
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
              opacity="0"
              filter="url(#aura-blur)"
            />
            <path d="M232 216 L268 180 L298 142" fill="none" stroke="#6b1317" strokeWidth="34" />
            <path d="M232 216 L268 180 L298 142" fill="none" stroke="#111115" strokeWidth="31" />
            <path d="M204 240 L242 200 L294 146" fill="none" stroke="#6b1317" strokeWidth="32" />
            <path d="M204 240 L242 200 L294 146" fill="none" stroke="#16161b" strokeWidth="29" />
            <g id="hero-katana">
              <path d="M296 138 L322 98" stroke="#0b0b0d" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M298 134 L304 126 M306 122 L312 114 M314 110 L320 102" stroke="#7a1519" strokeWidth="2" fill="none" />
              <ellipse
                cx="326"
                cy="92"
                rx="5"
                ry="14"
                transform="rotate(38 326 92)"
                fill="#0b0b0d"
                stroke="#ece6d8"
                strokeWidth="1.6"
              />
              <path
                d="M330 86 C350 56 400 -6 446 -52 L440 -34 C394 4 350 60 334 98 Z"
                fill="url(#blade)"
                stroke="#000"
                strokeWidth="1"
              />
              <path d="M338 84 C364 52 404 8 440 -28" stroke="#6f6b60" strokeWidth="1" fill="none" />
            </g>
          </g>

          <g id="hero-head" transform="translate(-52 -44) scale(1.27)">
            <path d="M168 176 L158 140 L176 154 L180 124 L196 148 L210 120 L216 150 L234 138 L228 170 C226 196 178 202 168 176 Z" />
            <path d="M170 160 L232 154 L233 164 L171 171 Z" fill="#1c1c22" strokeWidth="1" />
            <path d="M232 158 C258 150 280 160 300 150 L286 170 C268 168 252 172 233 166 Z" strokeWidth="1.2" />
            <g id="hero-eye" fill="none" stroke="#e5252a" strokeLinecap="round">
              <path d="M178 176 L194 172" strokeWidth="3" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
