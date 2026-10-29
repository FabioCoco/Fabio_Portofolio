import Link from "next/link";

export function SectionHeading({
  id,
  title,
  subtitle,
  action,
}: {
  id: string;
  title: string;
  subtitle: string;
  action?: { href: string; label: string };
}) {
  return (
    <header
      data-reveal
      className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-line pt-6"
    >
      <div>
        <h2
          id={id}
          className="font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl"
        >
          {title}
        </h2>
        <p className="mt-3 font-label text-xs uppercase tracking-[0.2em] text-accent">{subtitle}</p>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="font-label text-xs uppercase tracking-[0.15em] underline underline-offset-4 hover:text-accent"
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
