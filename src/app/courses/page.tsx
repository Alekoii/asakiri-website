import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import CourseCard from "@/features/courses/components/CourseCard";
import fs from "node:fs/promises";
import path from "node:path";

interface CourseManifestProject {
  name?: string;
  description?: string;
  language?: string;
}

interface CourseManifest {
  createdAt?: string;
  project?: CourseManifestProject;
}

interface CourseDefinition {
  slug: string;
  manifest: CourseManifest;
}

async function getCourses(): Promise<CourseDefinition[]> {
  const coursesDir = path.join(process.cwd(), "src/data/courses");

  try {
    const entries = await fs.readdir(coursesDir, { withFileTypes: true });

    const courses = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map(async (entry) => {
          const manifestPath = path.join(
            coursesDir,
            entry.name,
            "manifest.json"
          );

          try {
            const manifestRaw = await fs.readFile(manifestPath, "utf8");
            const manifest = JSON.parse(manifestRaw) as CourseManifest;

            return { slug: entry.name, manifest } satisfies CourseDefinition;
          } catch (error) {
            console.warn(
              `Skipping course "${entry.name}" without a valid manifest`,
              error
            );
            return null;
          }
        })
    );

    return courses.filter(
      (course): course is CourseDefinition => course !== null
    );
  } catch (error) {
    console.error("Unable to read course manifests", error);
    return [];
  }
}

function formatNameFromSlug(slug: string) {
  return slug
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <Header />
      <div className="space-y-8 p-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Browse the available courses.
          </p>
        </header>
        {courses.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map(({ slug, manifest }) => {
              const project = manifest.project ?? {};
              const projectName = project.name?.trim().length
                ? project.name
                : formatNameFromSlug(slug);

              return (
                <CourseCard
                  key={slug}
                  href={`/courses/${slug}`}
                  project={{
                    ...project,
                    name: projectName,
                  }}
                  createdAt={manifest.createdAt}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No courses found yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
