import LessonChip from "@/features/course/components/lesson-chip";
import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";

interface Lesson {
  id?: string;
  title?: string;
  path?: string;
}

interface CourseUnit {
  id?: string;
  title?: string;
  lessons?: Lesson[];
}

interface CourseSection {
  id?: string;
  title?: string;
  lessons?: Lesson[];
  units?: CourseUnit[];
}

interface CourseManifest {
  createdAt?: string;
  project?: {
    name?: string;
    description?: string;
    language?: string;
  };
  courseStructure?: CourseSection[];
}

async function readManifest(slug: string): Promise<CourseManifest | null> {
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

function buildLessonHref(slug: string, lesson?: Lesson) {
  if (!lesson?.id) {
    return undefined;
  }

  return `/courses/${slug}/lessons/${lesson.id}`;
}

const chipVariants = ["green", "yellow", "blue"] as const;

const rowTitlePattern = /^Row\s+\d+$/i;

function pickVariant(index: number) {
  return chipVariants[index % chipVariants.length];
}

type CoursesPageProps = {
  params: { slug: string };
};

export default async function CourseDetailPage({ params }: CoursesPageProps) {
  const slug = params.slug;

  const manifest = await readManifest(slug);

  if (!manifest) {
    notFound();
  }

  const project = manifest.project ?? {};
  const sections = manifest.courseStructure ?? [];

  return (
    <div className="space-y-8">
      <Header />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight flex mx-auto justify-center">
          {project.name ?? slug}
        </h1>
        {project.description ? (
          <p className="max-w-2xl text-muted-foreground flex mx-auto justify-center px-4 text-center">
            {project.description}
          </p>
        ) : null}
      </header>

      {sections.length ? (
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id ?? section.title} className="space-y-5 ">
              <div>
                <h2 className="text-xl font-semibold text-foreground flex mx-auto justify-center">
                  {section.title ?? "Untitled Section"}
                </h2>
                {section.lessons?.length ? (
                  <p className="text-sm text-muted-foreground flex mx-auto justify-center">
                    {section.lessons.length} lesson(s)
                  </p>
                ) : section.units?.length ? (
                  <p className="text-sm text-muted-foreground flex mx-auto justify-center">
                    {section.units.length} module(s)
                  </p>
                ) : null}
              </div>

              {section.units?.length ? (
                <div className="space-y-6">
                  {section.units.map((unit) => {
                    const normalizedTitle = unit.title?.trim();
                    const displayTitle = !normalizedTitle
                      ? "Module"
                      : rowTitlePattern.test(normalizedTitle)
                        ? undefined
                        : normalizedTitle;

                    return (
                      <div key={unit.id ?? unit.title} className="space-y-3">
                        {displayTitle ? (
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            {displayTitle}
                          </h3>
                        ) : null}
                        <div className="flex gap-5 mx-auto justify-center">
                          {(unit.lessons ?? []).map((lesson, index) => (
                            <LessonChip
                              key={lesson.id ?? lesson.title}
                              title={lesson.title ?? "Lesson"}
                              href={buildLessonHref(slug, lesson)}
                              variant={pickVariant(index)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {section.lessons?.length ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {section.lessons.map((lesson, index) => (
                    <LessonChip
                      key={lesson.id ?? lesson.title}
                      title={lesson.title ?? "Lesson"}
                      href={buildLessonHref(slug, lesson)}
                      variant={pickVariant(index)}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No lessons published yet.</p>
      )}
    </div>
  );
}
