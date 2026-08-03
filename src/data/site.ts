// Site geneli sabitler — tek kaynak
export const GITHUB = "https://github.com/cebi101";
export const LINKEDIN = "https://www.linkedin.com/in/seymanurcebi";
export const EMAIL = "seymanurcebi6@gmail.com";

// Proje kartlarının hedefleri (translations.ts'teki projects.items sırasıyla)
// null = herkese açık repo yok → tıklanamaz kart (kırık link üretme)
export const PROJECT_HREFS: (string | null)[] = [
  null,
  "https://github.com/msgxr/teknofest-2026-kamu-evrak-akilli-ajan",
  null,
  "https://github.com/cebi101/YemekStes",
];

// Akademik veriler — resmî transkriptten (dil bağımsız sayılar)
export const SEMESTERS = [
  { ects: 30, gpa: 3.6, cum: 3.6 },
  { ects: 30, gpa: 3.6, cum: 3.6 },
  { ects: 31, gpa: 3.4, cum: 3.53 },
  { ects: 33, gpa: 3.65, cum: 3.62 },
];
export const TOTAL_ECTS = SEMESTERS.reduce((s, x) => s + x.ects, 0);
export const CURRENT_GPA = SEMESTERS[SEMESTERS.length - 1].cum;
