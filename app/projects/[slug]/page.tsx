import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { title: "Masalah", text: project.problem },
    { title: "Solusi", text: project.solution },
    { title: "Peran", text: project.role },
    { title: "Hasil", text: project.result },
  ];

  return (
    <>
      <Nav home={false} current="projects" />
      <main id="main" className="flex-1 px-5 py-12">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/projects"
            className="font-label text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
          >
            ← Semua project
          </Link>
          <p className="mt-8 font-label text-xs uppercase tracking-[0.3em] text-muted">
            {project.type} · {project.year}{project.involvement === "Kontributor" ? " · Kontributor" : ""}
          </p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2 font-label text-xs text-muted">
            {project.stack.map((s) => (
              <li key={s} className="border border-line px-2 py-1">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3 font-label text-xs uppercase tracking-[0.15em]">
            {project.demo ? (
              <a
                href={project.demo}
                className="border border-red bg-red px-4 py-2 text-white hover:bg-red-deep"
              >
                Demo
              </a>
            ) : null}
            {project.repo ? (
              <a href={project.repo} className="border border-line px-4 py-2 hover:border-red hover:text-accent">
                Repo
              </a>
            ) : null}
          </div>

          {project.screenshots.length > 0 ? (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((src, i) => (
                <li
                  key={src}
                  className="relative aspect-video border border-line bg-surface first:sm:col-span-2"
                >
                  <Image
                    src={src}
                    alt={`Screenshot ${i + 1} dari ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 48rem, 100vw"
                    quality={85}
                    className="object-cover object-top"
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.title} className="border-l-2 border-red pl-5">
                <h2 className="font-label text-xs uppercase tracking-[0.2em]">{s.title}</h2>
                <p className="mt-2 text-lg leading-relaxed">{s.text}</p>
                {s.title === "Peran" && project.docs ? (
                  <p className="mt-3 text-lg leading-relaxed">
                    Dokumentasi pengerjaan:{" "}
                    <a
                      href={project.docs.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-4 hover:text-bone"
                    >
                      {project.docs.label}
                    </a>
                  </p>
                ) : null}
              </section>
            ))}
          </div>

          {projects.length > 1 ? (
            <Link
              href={`/projects/${next.slug}`}
              className="mt-12 block border border-line p-5 hover:border-red"
            >
              <span className="font-label text-xs uppercase tracking-[0.2em] text-muted">
                Misi berikutnya →
              </span>
              <span className="mt-1 block font-display text-2xl uppercase tracking-wide">
                {next.title}
              </span>
            </Link>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
