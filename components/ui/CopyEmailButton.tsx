"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="border border-red bg-red px-4 py-2 font-label text-xs uppercase tracking-[0.15em] text-white hover:bg-red-deep"
    >
      <span aria-live="polite">{copied ? "Tersalin" : "Salin email"}</span>
    </button>
  );
}
