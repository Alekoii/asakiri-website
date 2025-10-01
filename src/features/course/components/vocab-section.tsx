import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COMMON_EXCLUDED_FIELDS = new Set([
  "id",
  "rowid",
  "created_at",
  "modified_at",
  "table",
  "key",
]);

export interface VocabSectionEntry {
  ref?: {
    table?: string;
    key?: string | number;
  };
  data?: Record<string, unknown>;
}

export interface VocabSectionProps {
  title?: string;
  entries: VocabSectionEntry[];
  className?: string;
  emptyMessage?: string;
  practiceHref?: string;
  practiceLabel?: string;
}

export default function VocabSection({
  title = "Vocabulary",
  entries,
  className,
  emptyMessage = "No vocabulary available yet.",
  practiceHref,
  practiceLabel = "Practice",
}: VocabSectionProps) {
  const vocabulary = entries.filter((entry) => entry.data);

  return (
    <section className={cn("space-y-4", className)}>
      <div className="space-y-3 sm:space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {practiceHref ? (
            <Button asChild variant="secondary" size="lg">
              <Link href={practiceHref}>{practiceLabel}</Link>
            </Button>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">
          {vocabulary.length} item{vocabulary.length === 1 ? "" : "s"}
        </p>
      </div>

      {vocabulary.length ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {vocabulary.map((entry, index) => (
            <li
              key={String(entry.ref?.key ?? index)}
              className="rounded-2xl border border-border/60 bg-card p-4 text-card-foreground shadow-sm"
            >
              <VocabCard entry={entry} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

function VocabCard({ entry }: { entry: VocabSectionEntry }) {
  const data = entry.data ?? {};
  const fieldEntries = extractFieldEntries(data);
  const [primary, ...rest] = fieldEntries;

  const heading = primary?.value ?? "Untitled";
  const { readings, descriptions, extra } = splitSupportingEntries(rest);
  const source = entry.ref?.table;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-lg font-semibold text-foreground">{heading}</p>
        {readings.length ? (
          <p className="text-sm text-muted-foreground">{readings.join(" • ")}</p>
        ) : null}
      </div>

      {descriptions.length ? (
        <div className="space-y-2">
          {descriptions.map((text, index) => (
            <p key={index} className="text-sm leading-relaxed text-foreground/90">
              {text}
            </p>
          ))}
        </div>
      ) : null}

      {extra.length ? (
        <dl className="space-y-1 text-xs text-muted-foreground">
          {extra.map(({ label, value }) => (
            <div key={label} className="flex gap-2">
              <dt className="shrink-0 uppercase tracking-wide">{label}</dt>
              <dd className="truncate text-foreground/80">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {source ? (
        <p className="text-[10px] uppercase text-muted-foreground/80">Source: {source}</p>
      ) : null}
    </div>
  );
}

interface FieldEntry {
  key: string;
  value: string;
}

function extractFieldEntries(data: Record<string, unknown>): FieldEntry[] {
  return Object.entries(data)
    .filter(([key, value]) => {
      if (COMMON_EXCLUDED_FIELDS.has(key)) {
        return false;
      }

      return typeof value === "string" && value.trim().length > 0;
    })
    .map(([key, value]) => ({
      key,
      value: (value as string).trim(),
    }));
}

function splitSupportingEntries(entries: FieldEntry[]) {
  const readings: string[] = [];
  const descriptions: string[] = [];
  const extra: { label: string; value: string }[] = [];

  entries.forEach(({ key, value }) => {
    if (/furigana|reading|kana|pronunciation/i.test(key)) {
      readings.push(value);
      return;
    }

    if (/meaning|definition|translation|gloss|notes?/i.test(key)) {
      descriptions.push(value);
      return;
    }

    extra.push({ label: normalizeLabel(key), value });
  });

  return { readings, descriptions, extra };
}

function normalizeLabel(label: string): string {
  return label
    .replace(/_/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
