const items = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="font-display text-xl uppercase tracking-wide">
          Black <span className="text-red">Bulls</span>
        </a>
        <ul className="flex flex-wrap justify-end gap-x-4 gap-y-1 font-label text-[0.7rem] uppercase tracking-[0.15em] text-muted sm:gap-x-6 sm:text-xs">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="py-1 hover:text-red">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
