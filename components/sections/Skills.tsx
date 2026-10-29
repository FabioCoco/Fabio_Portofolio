import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  if (skills.length === 0) return null;
  return (
    <section aria-labelledby="skills" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="skills" title="Keahlian" subtitle="Skill" />
        <div className="grid gap-5 md:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} data-reveal className="border border-line bg-surface p-5">
              <h3 className="font-label text-xs uppercase tracking-[0.2em] text-accent">{g.group}</h3>
              <ul className="mt-4 space-y-2 text-lg">
                {g.items.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
