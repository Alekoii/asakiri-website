import fs from "node:fs/promises";
import path from "node:path";

import Header from "@/components/layout/header";
import TiptapViewer, {
  type TiptapJSONContent,
  type TiptapReferenceMap,
} from "@/features/course/components/tiptap-viewer";
import VocabSection from "@/features/course/components/vocab-section";
import {
  collectManifestLessons,
  getDisplayUnitTitle,
  readManifest,
} from "@/features/course/lib/manifest";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LessonSection {
  id?: string;
  title?: string;
  type?: string;
  order_index?: number;
  content?: TiptapJSONContent;
}

interface LessonFile {
  id?: string;
  title?: string;
  content?: {
    sections?: LessonSection[];
  };
  vocabulary?: LessonVocabularyEntry[];
}

interface LessonVocabularyEntry {
  ref?: {
    table?: string;
    key?: string | number;
  };
  data?: Record<string, unknown>;
}

type LessonPageParams = {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageParams) {
  const { slug, lessonId } = await params;

  const manifest = await readManifest(slug);

  if (!manifest) {
    notFound();
  }

  const lessons = collectManifestLessons(manifest);
  const lessonMeta = lessons.find((lesson) => lesson.id === lessonId);

  if (!lessonMeta || !lessonMeta.path) {
    notFound();
  }

  const lessonFile = await readLessonFile(slug, lessonMeta.path);

  if (!lessonFile) {
    notFound();
  }

  const sections = (lessonFile.content?.sections ?? []).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );

  const lessonTitle = lessonFile.title ?? lessonMeta.title ?? lessonMeta.id ?? lessonId;
  const sectionLabel = lessonMeta.sectionTitle?.trim();
  const unitLabel = getDisplayUnitTitle(lessonMeta.unitTitle);
  const locationLabel = [sectionLabel, unitLabel].filter(Boolean).join(" • ");
  const vocabularyEntries = lessonFile.vocabulary ?? [];
  const references = buildReferenceMap(vocabularyEntries);

  return (
    <div className="space-y-10">
      <Header />

      <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
        <BackLink slug={slug} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,_70%)_minmax(0,_30%)]">
          <article className="space-y-10">
            <header className="space-y-2 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {manifest.project?.name ?? slug}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">{lessonTitle}</h1>
              {locationLabel ? (
                <p className="text-sm text-muted-foreground">{locationLabel}</p>
              ) : null}
            </header>

            {sections.length ? (
              sections.map((section) => (
                <LessonSectionView
                  key={section.id ?? section.title}
                  section={section}
                  references={references}
                />
              ))
            ) : (
              <p className="text-muted-foreground">No lesson content available yet.</p>
            )}
          </article>

          <aside className="space-y-6">
            <VocabSection
              entries={vocabularyEntries}
              practiceHref={`/courses/${slug}/lessons/${lessonId}/practice`}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function BackLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
    >
      <span aria-hidden="true">←</span>
      Back to course overview
    </Link>
  );
}

function LessonSectionView({
  section,
  references,
}: {
  section: LessonSection;
  references: TiptapReferenceMap;
}) {
  const title = section.title ?? "Untitled Section";
  const isRich = section.type === "rich";

  if (!isRich) {
    return null;
  }

  return (
    <section className="space-y-3 rounded-3xl bg-neutral-50 p-6 dark:bg-neutral-900">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <TiptapViewer content={section.content} references={references} />
    </section>
  );
}

async function readLessonFile(slug: string, lessonRelativePath: string): Promise<LessonFile | null> {
  const lessonPath = path.join(
    process.cwd(),
    "src/data/courses",
    slug,
    lessonRelativePath
  );

  try {
    const raw = await fs.readFile(lessonPath, "utf8");
    return JSON.parse(raw) as LessonFile;
  } catch (error) {
    console.error(`Unable to read lesson file "${lessonRelativePath}" for course "${slug}"`, error);
    return null;
  }
}

function buildReferenceMap(entries: LessonVocabularyEntry[]): TiptapReferenceMap {
  return entries.reduce<TiptapReferenceMap>((acc, entry) => {
    const tableName = entry.ref?.table;
    const key = entry.ref?.key;
    const data = entry.data;

    if (!tableName || key === undefined || key === null || !data) {
      return acc;
    }

    const normalizedKey = typeof key === "string" ? key : String(key);
    const tableMap = acc[tableName] ?? {};
    tableMap[normalizedKey] = data;
    acc[tableName] = tableMap;

    return acc;
  }, {});
}
