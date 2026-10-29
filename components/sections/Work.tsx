import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

const PREVIEW_COUNT = 3;

// Pratinjau di beranda; daftar lengkap ada di /projects.
export function Work() {
  return (
    <section aria-labelledby="work" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="work"
          title="Mission Log"
          subtitle="Project terpilih"
          action={{ href: "/projects", label: "Lihat semua project →" }}
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, PREVIEW_COUNT).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
