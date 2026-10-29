export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  type: "Kuliah" | "Personal" | "Tim";
  demo?: string; // link demo (live)
  repo?: string; // link repository GitHub
  // Taruh screenshot di public/projects/<slug>/, mis. "/projects/<slug>/1.webp"
  screenshots: string[];
  problem: string;
  solution: string;
  role: string;
  result: string;
};

// TODO: ganti seluruh isi dengan project asli. Urutkan dari yang terbaik.
export const projects: Project[] = [
  {
    slug: "todo-project-1",
    title: "TODO Judul Project 1",
    summary: "TODO: ringkasan satu kalimat.",
    stack: ["TODO"],
    type: "Personal",
    demo: "",
    repo: "https://github.com/TODO/repo-1",
    screenshots: [],
    problem: "TODO",
    solution: "TODO",
    role: "TODO",
    result: "TODO",
  },
  {
    slug: "todo-project-2",
    title: "TODO Judul Project 2",
    summary: "TODO: ringkasan satu kalimat.",
    stack: ["TODO"],
    type: "Kuliah",
    demo: "",
    repo: "https://github.com/TODO/repo-2",
    screenshots: [],
    problem: "TODO",
    solution: "TODO",
    role: "TODO",
    result: "TODO",
  },
  {
    slug: "todo-project-3",
    title: "TODO Judul Project 3",
    summary: "TODO: ringkasan satu kalimat.",
    stack: ["TODO"],
    type: "Tim",
    demo: "",
    repo: "https://github.com/TODO/repo-3",
    screenshots: [],
    problem: "TODO",
    solution: "TODO",
    role: "TODO",
    result: "TODO",
  },
];
