export type SkillGroup = {
  group: string;
  items: string[];
};

// Isi hanya skill yang benar-benar dikuasai. Selama kosong, section Skills tidak ditampilkan.
export const skills: SkillGroup[] = [];
