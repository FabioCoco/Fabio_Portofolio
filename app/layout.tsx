import type { Metadata } from "next";
import { Anton, Crimson_Pro, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Black Bulls Member File",
  description: "Portofolio mahasiswa Informatics Engineering. Fan tribute bertema Black Clover.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} ${label.variable} ${jp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
