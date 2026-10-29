import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Clover } from "@/components/ui/Clover";

// Kartu project: bingkai ganda dengan nomor di pojok kiri-atas dan kanan-bawah.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const thumb = project.screenshots[0];
  const num = String(index + 1).padStart(2, "0");
  const link = "text-accent underline underline-offset-4 hover:text-bone";
  const corner = "flex flex-col items-center font-display text-xl leading-none";
  return (
    <li data-reveal className="fx-card border border-line bg-surface p-1.5">
      <div className="relative flex h-full flex-col border border-line px-5 pb-12 pt-12">
        <span className={`absolute left-3 top-3 ${corner}`}>
          {num}
          <Clover className="mt-1 h-3.5 w-3.5 text-accent" />
        </span>
        <span className={`absolute bottom-3 right-3 rotate-180 ${corner}`}>
          {num}
          <Clover className="mt-1 h-3.5 w-3.5 text-accent" />
        </span>

        <div className="relative aspect-video border border-line bg-bg">
          {thumb ? (
            <Image
              src={thumb}
              alt={`Tampilan ${project.title}`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-line">
              <Clover className="h-14 w-14" />
            </span>
          )}
        </div>

        <p className="mt-4 flex justify-between font-label text-xs uppercase tracking-[0.2em] text-muted">
          <span>
            {project.type}
            {project.involvement === "Kontributor" ? " · Kontributor" : ""}
          </span>
          <span>{project.year}</span>
        </p>
        <h3 className="mt-2 font-display text-3xl uppercase leading-tight tracking-wide">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-lg leading-relaxed">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2 font-label text-xs text-muted">
          {project.stack.map((s) => (
            <li key={s} className="border border-line px-2 py-1">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-4 pt-5 font-label text-xs uppercase tracking-[0.15em]">
          <Link href={`/projects/${project.slug}`} className={link}>
            Detail
          </Link>
          {project.demo ? (
            <a href={project.demo} className={link}>
              Demo
            </a>
          ) : null}
          {project.repo ? (
            <a href={project.repo} className={link}>
              Repo
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}
