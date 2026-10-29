export function SectionHeading({
  id,
  file,
  title,
  subtitle,
}: {
  id: string;
  file: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-10 border-t border-line pt-6">
      <p className="font-label text-xs uppercase tracking-[0.3em] text-muted">{file}</p>
      <h2
        id={id}
        className="mt-2 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl"
      >
        {title}
      </h2>
      <p className="mt-3 font-label text-xs uppercase tracking-[0.2em] text-red">{subtitle}</p>
    </header>
  );
}
