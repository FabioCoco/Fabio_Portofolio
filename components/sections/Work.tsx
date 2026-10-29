import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Work() {
  return (
    <section aria-labelledby="work" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="work" file="FILE 02" title="Mission Log" subtitle="Project" />
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug} className="flex flex-col border border-line bg-surface p-5">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">
                Mission {String(i + 1).padStart(2, "0")} · {p.type}
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-wide">{p.title}</h3>
              <p className="mt-3 text-lg leading-relaxed">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2 font-label text-xs text-muted">
                {p.stack.map((s) => (
                  <li key={s} className="border border-line px-2 py-1">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex gap-4 pt-5 font-label text-xs uppercase tracking-[0.15em]">
                {p.demo ? (
                  <a href={p.demo} className="text-red underline underline-offset-4 hover:text-bone">
                    Demo
                  </a>
                ) : null}
                {p.repo ? (
                  <a href={p.repo} className="text-red underline underline-offset-4 hover:text-bone">
                    Repo
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
