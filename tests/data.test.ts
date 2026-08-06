import { describe, it, expect } from "vitest";
import { SEMESTERS, TOTAL_ECTS, TOTAL_COURSES, CURRENT_GPA } from "../src/data/site";

describe("akademik veri türetimi", () => {
  it("toplam AKTS dönemlerden hesaplanır", () => {
    const beklenen = SEMESTERS.reduce((t, s) => t + s.ects, 0);
    expect(TOTAL_ECTS).toBe(beklenen);
  });

  it("toplam ders sayısı dönemlerden hesaplanır", () => {
    const beklenen = SEMESTERS.reduce((t, s) => t + s.courses, 0);
    expect(TOTAL_COURSES).toBe(beklenen);
  });

  it("genel ortalama son dönemin kümülatif değeridir", () => {
    expect(CURRENT_GPA).toBe(SEMESTERS[SEMESTERS.length - 1].cum);
  });

  it("her dönem tutarlı: ders/kredi/AKTS pozitif, GNO 0-4 arasında", () => {
    for (const [i, s] of SEMESTERS.entries()) {
      expect(s.courses, `dönem ${i + 1} ders`).toBeGreaterThan(0);
      expect(s.credits, `dönem ${i + 1} kredi`).toBeGreaterThan(0);
      expect(s.ects, `dönem ${i + 1} AKTS`).toBeGreaterThan(0);
      expect(s.gpa, `dönem ${i + 1} dönem GNO`).toBeGreaterThan(0);
      expect(s.gpa).toBeLessThanOrEqual(4);
      expect(s.cum, `dönem ${i + 1} kümülatif`).toBeGreaterThan(0);
      expect(s.cum).toBeLessThanOrEqual(4);
    }
  });
});
