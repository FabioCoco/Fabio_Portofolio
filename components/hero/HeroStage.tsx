"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

// Partikel debu deterministik (tanpa Math.random saat render, supaya SSR = klien).
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 35 + ((i * 53 + 7) % 60),
  size: 2 + (i % 3),
  warm: i % 3 === 0,
}));

// Retakan gelap di sekitar titik tengah garis tebasan (koordinat viewBox 0-100).
const CRACKS = [
  "M50 50 L44 44 L46 38 L40 31",
  "M50 50 L57 55 L55 62 L62 69",
  "M50 50 L41 53 L36 50 L28 56",
  "M50 50 L58 43 L64 45 L71 38",
  "M44 44 L38 42 L33 36",
  "M57 55 L63 53 L68 58",
];

// Kanji 闇魔法 untuk overlay aftermath, dirender sebagai SVG data-URI.
const KANJI_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'><text x='150' y='82' text-anchor='middle' font-size='96' font-weight='900' fill='#e5252a' font-family='"Noto Serif JP","Yu Mincho","Hiragino Mincho ProN","Noto Serif CJK JP",serif'>闇魔法</text></svg>`;
const KANJI_BG = `url("data:image/svg+xml,${encodeURIComponent(KANJI_SVG)}")`;

/**
 * Pembungkus hero: menaruh lapisan efek dan menjalankan timeline GSAP
 * idle -> charge -> slash -> split -> aftermath (PLAN.md bagian 6, Tier A).
 * Konten hero (server component) masuk lewat `children`.
 * Tanpa animasi (prefers-reduced-motion) tidak ada yang dijalankan: hero tampil statis
 * dengan garis tebasan sudah tergambar.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia(el);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const shake = q("[data-fx=shake]")[0] as HTMLElement;
      const band = q("[data-fx=band]")[0];
      const edgeL = q("[data-fx=edge-l]")[0];
      const edgeR = q("[data-fx=edge-r]")[0];
      const slash = q(".fx-slash");
      const core = q(".fx-slash-core");

      // Posisi/ukuran celah diagonal (persen lebar) -> clip-path konten + bidang gelap + tepi merah.
      const gap = { w: 0 };
      const applyGap = () => {
        const w = gap.w;
        if (w <= 0.01) {
          shake.style.clipPath = "none";
          band.setAttribute("points", "100,0 100,0 0,100 0,100");
          edgeL.setAttribute("opacity", "0");
          edgeR.setAttribute("opacity", "0");
          return;
        }
        shake.style.clipPath = `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${100 - w}% 0, ${100 + w}% 0, ${w}% 100%, ${-w}% 100%, ${100 - w}% 0)`;
        band.setAttribute("points", `${100 - w},0 ${100 + w},0 ${w},100 ${-w},100`);
        edgeL.setAttribute("x1", `${100 - w}`);
        edgeL.setAttribute("x2", `${-w}`);
        edgeR.setAttribute("x1", `${100 + w}`);
        edgeR.setAttribute("x2", `${w}`);
        edgeL.setAttribute("opacity", "1");
        edgeR.setAttribute("opacity", "1");
      };

      // 1. IDLE: jubah bergoyang, badan bernapas, debu melayang (berulang terus).
      gsap.to(q("#hero-cape"), {
        rotation: -3.5,
        skewY: 2.5,
        svgOrigin: "240 200",
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(q("#hero-figure"), {
        y: 3,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(q("#hero-head"), {
        rotation: 1.5,
        svgOrigin: "200 210",
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      q("[data-fx=particle]").forEach((p) => {
        gsap.fromTo(
          p,
          { y: 0, x: 0, opacity: 0 },
          {
            y: gsap.utils.random(-140, -60),
            x: gsap.utils.random(-30, 30),
            opacity: gsap.utils.random(0.25, 0.6),
            duration: gsap.utils.random(4, 8),
            delay: gsap.utils.random(0, 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
        );
      });

      // Pivot rotasi (koordinat viewBox YamiScene): bahu untuk lengan + katana, pinggul untuk torso.
      const SHOULDER = "230 214";
      const HIP = "232 346";
      const arm = q("#hero-arm");
      const torso = q("#hero-torso");
      const figure = q("#hero-figure");
      const glow = q(".fx-slash-glow");

      // Timeline berurutan. restart() mengulang dari state awal (semua di-reset di t=0).
      const tl = gsap.timeline({
        onStart: () => setPlaying(true),
        onComplete: () => setPlaying(false),
      });
      tlRef.current = tl;

      tl.set(slash, { strokeDashoffset: 1 }, 0)
        .set([core, glow], { opacity: 1 }, 0)
        .set(q("[data-fx=vignette]"), { opacity: 0 }, 0)
        .set(q("[data-fx=flash]"), { opacity: 0 }, 0)
        .set(q(".hero-aura"), { opacity: 0 }, 0)
        .set(arm, { rotation: 0, svgOrigin: SHOULDER }, 0)
        .set(torso, { rotation: 0, svgOrigin: HIP }, 0)
        .set(figure, { x: 0 }, 0)
        .set(q("[data-fx=crack]"), { strokeDashoffset: 1, opacity: 1 }, 0)
        .set(q("[data-fx=kanji]"), { opacity: 0 }, 0)
        .call(() => {
          gap.w = 0;
          applyGap();
        }, [], 0);

      // 2. CHARGE: katana ditarik ke belakang, badan merunduk, aura menebal, vignette menutup.
      tl.addLabel("charge", 0.9)
        .to(q(".hero-aura"), { opacity: 0.95, duration: 0.9, ease: "power2.in" }, "charge")
        .to(q("[data-fx=vignette]"), { opacity: 0.85, duration: 0.9, ease: "power2.in" }, "charge")
        .to(arm, { rotation: 16, svgOrigin: SHOULDER, duration: 0.9, ease: "power2.in" }, "charge")
        .to(torso, { rotation: 5, svgOrigin: HIP, duration: 0.9, ease: "power2.in" }, "charge")
        .to(figure, { x: 12, duration: 0.9, ease: "power2.in" }, "charge");

      // 3. SLASH: setelah jeda singkat (antisipasi), katana menyapu turun ke kiri-bawah,
      // garis tebasan tergambar searah ayunan, flash, layar bergetar ~210 ms.
      tl.addLabel("slash", "charge+=1.1")
        .to(arm, { rotation: -172, svgOrigin: SHOULDER, duration: 0.16, ease: "power3.in" }, "slash")
        .to(torso, { rotation: -9, svgOrigin: HIP, duration: 0.16, ease: "power3.in" }, "slash")
        .to(figure, { x: -22, duration: 0.16, ease: "power3.in" }, "slash")
        .to(slash, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, "slash+=0.04")
        .fromTo(
          q("[data-fx=flash]"),
          { opacity: 0.9 },
          { opacity: 0, duration: 0.3, ease: "power2.out", immediateRender: false },
          "slash+=0.14",
        )
        .to(
          shake,
          {
            keyframes: [
              { x: -10, y: 5, duration: 0.035 },
              { x: 9, y: -6, duration: 0.035 },
              { x: -7, y: 4, duration: 0.035 },
              { x: 5, y: -3, duration: 0.035 },
              { x: -3, y: 2, duration: 0.035 },
              { x: 0, y: 0, duration: 0.035 },
            ],
          },
          "slash+=0.14",
        );

      // 4. SPLIT: layar terbelah sepanjang garis diagonal, melebar, lalu menutup.
      // Pendekar bertahan di pose akhir tebasan (follow-through) sebelum kembali ke posisi awal.
      tl.addLabel("split", "slash+=0.3")
        .to(gap, { w: 3.6, duration: 0.25, ease: "power3.out", onUpdate: applyGap }, "split")
        .to(gap, { w: 0, duration: 0.55, ease: "power2.inOut", onUpdate: applyGap }, "split+=0.45")
        .to(arm, { rotation: 0, svgOrigin: SHOULDER, duration: 1.1, ease: "power2.inOut" }, "split+=0.5")
        .to(torso, { rotation: 0, svgOrigin: HIP, duration: 1.1, ease: "power2.inOut" }, "split+=0.5")
        .to(figure, { x: 0, duration: 1.1, ease: "power2.inOut" }, "split+=0.5")
        .to(q("[data-fx=vignette]"), { opacity: 0, duration: 0.9, ease: "power1.out" }, "split")
        .to(q(".hero-aura"), { opacity: 0, duration: 0.9, ease: "power1.out" }, "split");

      // 5. AFTERMATH: retakan gelap dan teks 闇魔法 muncul lalu memudar. Garis tebasan
      // memudar sepenuhnya sehingga hero kembali bersih.
      tl.addLabel("aftermath", "split+=0.5")
        .to(
          q("[data-fx=crack]"),
          { strokeDashoffset: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" },
          "aftermath",
        )
        .fromTo(
          q("[data-fx=kanji]"),
          { opacity: 0, scale: 1.15 },
          { opacity: 0.85, scale: 1, duration: 0.4, ease: "power2.out", immediateRender: false },
          "aftermath",
        )
        .to(q("[data-fx=kanji]"), { opacity: 0, duration: 1.2, ease: "power1.in" }, "aftermath+=1")
        .to(q("[data-fx=crack]"), { opacity: 0, duration: 1.2, ease: "power1.in" }, "aftermath+=1")
        .to([core, glow], { opacity: 0, duration: 1.0, ease: "power1.out" }, "aftermath+=0.6");

      return () => {
        tlRef.current = null;
        gap.w = 0;
        applyGap();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      aria-label="Perkenalan"
      className="relative isolate overflow-hidden px-5 pb-12 pt-10 sm:pt-16"
    >
      {/* Bidang gelap + tepi merah yang terlihat lewat celah belahan (di bawah konten) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <polygon data-fx="band" points="100,0 100,0 0,100 0,100" fill="#000" />
        <line data-fx="edge-l" x1="100" y1="0" x2="0" y2="100" stroke="#e5252a" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0" />
        <line data-fx="edge-r" x1="100" y1="0" x2="0" y2="100" stroke="#e5252a" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0" />
      </svg>

      {/* Konten hero (ikut bergetar dan terbelah) */}
      <div data-fx="shake">{children}</div>

      {/* Efek di atas konten; semua tersembunyi pada state statis */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 motion-reduce:hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            data-fx="particle"
            className={`absolute rounded-full opacity-0 ${p.warm ? "bg-red-deep" : "bg-bone"}`}
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          />
        ))}
        <div
          data-fx="vignette"
          className="absolute inset-0 opacity-0"
          style={{ background: "radial-gradient(circle at 65% 45%, transparent 20%, #000 85%)" }}
        />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {CRACKS.map((d) => (
            <path
              key={d}
              data-fx="crack"
              d={d}
              pathLength={1}
              stroke="#000"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center overflow-hidden">
          {/* Kanji sebagai background data-URI (bukan teks/gambar yang dihitung LCP) supaya
              kemunculannya di akhir animasi tidak menggeser LCP halaman. */}
          <div
            data-fx="kanji"
            aria-hidden="true"
            className="aspect-[3/1] w-[92vw] max-w-4xl bg-contain bg-center bg-no-repeat opacity-0 sm:w-[64vw]"
            style={{ backgroundImage: KANJI_BG }}
          />
        </div>
        <div data-fx="flash" className="absolute inset-0 bg-white opacity-0" />
      </div>

      <button
        type="button"
        onClick={() => tlRef.current?.restart()}
        disabled={playing}
        className="absolute bottom-3 right-4 z-30 border border-line bg-bg/80 px-3 py-2 font-label text-[0.7rem] uppercase tracking-[0.15em] text-muted hover:border-red hover:text-accent disabled:cursor-wait disabled:opacity-50 motion-reduce:hidden"
      >
        Ulangi tebasan
      </button>
    </section>
  );
}
