// Ornamen semanggi empat daun buatan sendiri (SVG), bukan logo resmi.
export function Clover({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="-4" cy="-1" r="4.2" />
      <circle cx="4" cy="-1" r="4.2" />
      <circle cx="0" cy="-5" r="4.2" />
      <circle cx="0" cy="3" r="4.2" />
      <path d="M0 3 L3 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
