import fs from "node:fs/promises";
import path from "node:path";

export interface Lesson {
  id?: string;
  title?: string;
  path?: string;
}

export interface CourseUnit {
  id?: string;
  title?: string;
  lessons?: Lesson[];
}

export interface CourseSection {
  id?: string;
  title?: string;
  lessons?: Lesson[];
  units?: CourseUnit[];
}

export interface CourseManifest {
  createdAt?: string;
  project?: {
    name?: string;
    description?: string;
    language?: string;
  };
  courseStructure?: CourseSection[];
}

export interface CourseLessonDescriptor extends Lesson {
  sectionId?: string;
  sectionTitle?: string;
  unitId?: string;
  unitTitle?: string;
}

const rowTitlePattern = /^Row\s+\d+$/i;

export async function readManifest(slug: string): Promise<CourseManifest | null> {
  const manifestPath = path.join(
    process.cwd(),
    "src/data/courses",
    slug,
    "manifest.json"
  );

  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw) as CourseManifest;
  } catch (error) {
    console.error(`Unable to read manifest for course "${slug}"`, error);
    return null;
  }
}

export function collectManifestLessons(manifest: CourseManifest): CourseLessonDescriptor[] {
  const sections = manifest.courseStructure ?? [];

  const lessons: CourseLessonDescriptor[] = [];

  sections.forEach((section) => {
    const sectionLessons = section.lessons ?? [];

    sectionLessons.forEach((lesson) => {
      lessons.push({
        ...lesson,
        sectionId: section.id,
        sectionTitle: section.title,
      });
    });

    section.units?.forEach((unit) => {
      (unit.lessons ?? []).forEach((lesson) => {
        lessons.push({
          ...lesson,
          sectionId: section.id,
          sectionTitle: section.title,
          unitId: unit.id,
          unitTitle: unit.title,
        });
      });
    });
  });

  return lessons;
}

export function buildLessonHref(slug: string, lesson?: Lesson) {
  if (!lesson?.id) {
    return undefined;
  }

  return `/courses/${slug}/lessons/${lesson.id}`;
}

export function getDisplayUnitTitle(title?: string | null): string | undefined {
  const normalized = title?.trim();

  if (!normalized || rowTitlePattern.test(normalized)) {
    return undefined;
  }

  return normalized;
}
