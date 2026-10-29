import Link from "next/link";
import { certificates } from "@/content/certificates";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

const mongoCerts = certificates.filter((c) => c.issuer === "MongoDB");
const mandarin = projects.find((p) => p.slug === "panda-belajar-mandarin");
const bakehouse = projects.find((p) => p.slug === "bakehouse");

const mongoTopics = [
  "Data modeling",
  "CRUD",
  "Indexing",
  "Aggregation",
  "Atlas Search",
  "Transactions",
  "Node.js driver",
];

const mandarinStats = [
  ["286", "kosakata"],
  ["6", "bab tema"],
  ["3", "mode kuis"],
];

const card = "fx-card relative flex flex-col overflow-hidden border border-line bg-surface p-6 sm:p-8";
const kicker = "font-label text-xs uppercase tracking-[0.25em] text-accent";
const link =
  "font-label text-xs uppercase tracking-[0.15em] text-accent underline underline-offset-4 hover:text-bone";

// Dua bidang yang sedang saya dalami, masing-masing dengan bukti nyata (project dan sertifikat).
export function Focus() {
  return (
    <section aria-labelledby="fokus" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="fokus" title="Fokus Belajar" subtitle="Yang sedang saya dalami" />
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Mandarin */}
          <article data-reveal className={card}>
            <span
              aria-hidden="true"
              lang="zh"
              className="pointer-events-none absolute -right-2 -top-6 select-none font-jp text-[9rem] font-black leading-none text-line sm:text-[11rem]"
            >
              中文
            </span>
            <p className={kicker}>Bahasa</p>
            <h3 className="relative mt-3 font-display text-4xl uppercase tracking-wide sm:text-5xl">
              Mandarin
            </h3>
            <p className="relative mt-4 max-w-md text-lg leading-relaxed">
              Saya belajar bahasa Mandarin secara rutin. Supaya latihannya terstruktur, saya membuat
              aplikasi belajar sendiri: flashcard, kuis, dan pengulangan berjarak sistem Leitner.
            </p>
            <dl className="relative mt-6 grid grid-cols-3 gap-3">
              {mandarinStats.map(([n, label]) => (
                <div key={label} className="border border-line bg-bg/60 p-3">
                  <dt className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-display text-4xl">{n}</dd>
                </div>
              ))}
            </dl>
            <div className="relative mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
              {mandarin ? (
                <Link href={`/projects/${mandarin.slug}`} className={link}>
                  Lihat project →
                </Link>
              ) : null}
              {mandarin?.repo ? (
                <a href={mandarin.repo} className={link}>
                  Repo
                </a>
              ) : null}
            </div>
          </article>

          {/* MongoDB */}
          <article data-reveal className={card}>
            <p className={kicker}>Database</p>
            <h3 className="mt-3 font-display text-4xl uppercase tracking-wide sm:text-5xl">MongoDB</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              Saya mendalami MongoDB dari dasar sampai Node.js, lalu memakainya di project BakeHouse
              lewat MongoDB Atlas.
            </p>
            <pre
              aria-hidden="true"
              className="mt-6 overflow-x-auto border border-line bg-bg/60 p-4 font-label text-xs leading-relaxed text-muted"
            >
              <code>
                {`db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$product", total: { $sum: "$qty" } } },
  { $sort: { total: -1 } },
])`}
              </code>
            </pre>
            <ul className="mt-5 flex flex-wrap gap-2 font-label text-xs text-muted">
              {mongoTopics.map((t) => (
                <li key={t} className="border border-line px-2 py-1">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-label text-xs uppercase tracking-[0.15em] text-muted">
              <span className="font-display text-3xl normal-case tracking-normal text-bone">
                {mongoCerts.length}
              </span>{" "}
              sertifikat MongoDB
            </p>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
              <Link href="/certificates" className={link}>
                Lihat sertifikat →
              </Link>
              {bakehouse ? (
                <Link href={`/projects/${bakehouse.slug}`} className={link}>
                  Dipakai di BakeHouse
                </Link>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
