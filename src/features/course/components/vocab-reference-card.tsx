'use client';

import type { ReactNode } from "react";

import HoverCard from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const BASE_FIELDS = ["Word", "Name", "English", "Meaning"] as const;
const READING_FIELDS = ["Furigana", "Kana"] as const;
const IGNORED_FIELDS = new Set([
  "id",
  "rowid",
  "created_at",
  "modified_at",
  "table",
  "key",
]);

export interface VocabReferenceCardProps {
  children: ReactNode;
  data?: Record<string, unknown>;
  tableName?: string;
  className?: string;
}

export default function VocabReferenceCard({
  children,
  data,
  tableName,
  className,
}: VocabReferenceCardProps) {
  if (!data) {
    return <span className={cn("font-semibold text-foreground", className)}>{children}</span>;
  }

  const heading = firstString(data, BASE_FIELDS) ?? getChildText(children);
  const reading = firstString(data, READING_FIELDS);
  const meaning = getMeaning(data);

  const extraEntries = Object.entries(data)
    .filter(([key, value]) => {
      if (IGNORED_FIELDS.has(key)) {
        return false;
      }

      if (BASE_FIELDS.includes(key as (typeof BASE_FIELDS)[number])) {
        return false;
      }

      if (READING_FIELDS.includes(key as (typeof READING_FIELDS)[number])) {
        return false;
      }

      return typeof value === "string" && value.trim().length > 0;
    })
    .slice(0, 4);

  const trigger = (
    <span className={cn("cursor-help font-semibold text-green-600 dark:text-green-400", className)}>
      {children}
    </span>
  );

  return (
    <HoverCard
      trigger={trigger}
      content={
        <div className="space-y-2">
          {heading ? (
            <p className="text-sm font-semibold leading-tight text-foreground">{heading}</p>
          ) : null}
          {reading ? <p className="text-xs text-muted-foreground">{reading}</p> : null}
          {meaning ? <p className="text-sm text-foreground">{meaning}</p> : null}
          {extraEntries.length ? (
            <dl className="space-y-1 text-xs text-muted-foreground">
              {extraEntries.map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <dt className="shrink-0 capitalize">{normalizeKey(key)}:</dt>
                  <dd className="truncate">{String(value)}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {tableName ? (
            <p className="text-[10px] uppercase text-muted-foreground/80">
              Source: {tableName}
            </p>
          ) : null}
        </div>
      }
      contentClassName="max-w-sm"
    />
  );
}

function firstString(
  data: Record<string, unknown>,
  keys: readonly string[]
): string | undefined {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
}

function getMeaning(data: Record<string, unknown>): string | undefined {
  const meaning = data.Meaning ?? data.English;
  return typeof meaning === "string" && meaning.trim().length > 0
    ? meaning
    : undefined;
}

function normalizeKey(key: string): string {
  return key.replace(/_/g, " ");
}

function getChildText(children: ReactNode): string | undefined {
  if (typeof children === "string") {
    return children;
  }

  return undefined;
}
