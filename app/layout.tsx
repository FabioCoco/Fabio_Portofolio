import type { Metadata, Viewport } from "next";
import { Anton, Crimson_Pro, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SlashCursor } from "@/components/ui/SlashCursor";

const display = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Crimson_Pro({
  variable: "--font-body",
  subsets: ["latin"],
});

const label = JetBrains_Mono({
  variable: "--font-label",
  subsets: ["latin"],
});

// Font Jepang dipakai hanya untuk teks pendek (tagline, kanji dekoratif),
// jadi tidak di-preload agar halaman tetap ringan.
const jp = Noto_Serif_JP({
  variable: "--font-jp",
  weight: ["600", "900"],
  preload: false,
});

// TODO: set NEXT_PUBLIC_SITE_URL ke domain asli (mis. https://namaanda.vercel.app) saat deploy.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `Portofolio ${profile.name}, mahasiswa ${profile.major}. Project dan sertifikat. Fan tribute bertema Black Clover.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} | Black Bulls Member File`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Black Bulls Member File",
    title: `${profile.name} | Black Bulls Member File`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

// Menerapkan tema tersimpan sebelum paint agar tidak berkedip. Default: Night.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${label.variable} ${jp.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only z-[70] bg-red px-4 py-2 font-label text-xs uppercase text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Lewati ke konten
        </a>
        {children}
        <CommandPalette />
        <SlashCursor />
      </body>
    </html>
  );
}
