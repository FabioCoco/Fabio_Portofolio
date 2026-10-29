import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Clover } from "@/components/ui/Clover";

export const metadata: Metadata = {
  title: "Projects",
  description: "Semua project yang pernah saya buat: personal, kuliah, dan tim.",
};

export default function ProjectsPage() {
  return (
    <>
      <ScrollEffects />
      <Nav home={false} current="projects" />
      <main id="main" className="flex-1 px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="font-label text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
          >
            ← Kembali ke beranda
          </Link>

          <header className="mb-12 mt-12">
            <p className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-muted">
              Index
              <Clover className="h-3.5 w-3.5 text-accent" />
              <span aria-hidden="true" className="h-px w-10 bg-line" />
              {projects.length} misi di dalam berkas
            </p>
            <h1 className="mt-4 font-display text-7xl uppercase leading-none tracking-wide sm:text-9xl">
              Projects
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Project yang sudah pernah saya buat, baik sendiri maupun bersama tim. Buka tiap kartu
              untuk melihat masalah, solusi, peran, dan hasilnya.
            </p>
          </header>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
