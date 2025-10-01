import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import VocabReferenceCard from "@/features/course/components/vocab-reference-card";

export interface TiptapJSONMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapJSONContent {
  type: string;
  text?: string;
  content?: TiptapJSONContent | TiptapJSONContent[];
  attrs?: Record<string, unknown>;
  marks?: TiptapJSONMark[];
}

export interface TiptapViewerProps {
  content?: TiptapJSONContent | null;
  className?: string;
  emptyPlaceholder?: ReactNode;
  references?: TiptapReferenceMap;
}

export type TiptapReferenceMap = Record<string, Record<string, Record<string, unknown>>>;

const textAlignClass: Record<string, string> = {
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const underlineClasses = "underline decoration-2 underline-offset-4";

export default function TiptapViewer({
  content,
  className,
  emptyPlaceholder = null,
  references,
}: TiptapViewerProps) {
  if (!content) {
    return emptyPlaceholder ? <>{emptyPlaceholder}</> : null;
  }

  return (
    <div className={cn("space-y-4 text-base leading-relaxed", className)}>
      {renderNode(content, "root", { references, withinRuby: false })}
    </div>
  );
}

interface RenderContext {
  references?: TiptapReferenceMap;
  withinRuby: boolean;
}

function renderNode(
  node: TiptapJSONContent,
  key: React.Key,
  context: RenderContext
): ReactNode {
  switch (node.type) {
    case "doc":
      return (
        <Fragment key={key}>{renderChildren(node.content, `${key}`, context)}</Fragment>
      );

    case "paragraph": {
      const children = renderChildren(node.content, `${key}-paragraph`, context);

      if (!children.length) {
        return null;
      }

      const align = typeof node.attrs?.textAlign === "string" ? node.attrs.textAlign : undefined;

      return (
        <div
          key={key}
          className={cn(
            "whitespace-pre-wrap leading-7",
            align ? textAlignClass[align] : undefined
          )}
          role="paragraph"
        >
          {children}
        </div>
      );
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc space-y-2 pl-6">
          {renderChildren(node.content, `${key}-bullet`, context)}
        </ul>
      );

    case "listItem":
      return (
        <li key={key} className="space-y-2">
          {renderChildren(node.content, `${key}-item`, context)}
        </li>
      );

    case "reference": {
      return renderReferenceNode(node, key, context);
    }

    case "ruby": {
      const children = renderChildren(node.content, `${key}-ruby`, {
        ...context,
        withinRuby: true,
      });
      const reading = typeof node.attrs?.rt === "string" ? node.attrs.rt : "";

      return (
        <ruby key={key} className="whitespace-nowrap align-middle">
          <span className="ruby-base align-middle">{children}</span>
          {reading ? (
            <rt className="text-xs leading-tight text-muted-foreground">{reading}</rt>
          ) : null}
        </ruby>
      );
    }

    case "text":
      return <Fragment key={key}>{applyMarks(node)}</Fragment>;

    default:
      return (
        <Fragment key={key}>
          {renderChildren(node.content, `${key}-fallback`, context)}
        </Fragment>
      );
  }
}

function renderChildren(
  content: TiptapJSONContent | TiptapJSONContent[] | undefined,
  keyPrefix: string,
  context: RenderContext
): ReactNode[] {
  return normalizeContent(content).map((child, index) =>
    renderNode(child, `${keyPrefix}-${index}`, context)
  );
}

function renderReferenceNode(
  node: TiptapJSONContent,
  key: React.Key,
  context: RenderContext
): ReactNode {
  const children = renderChildren(node.content, `${key}-reference`, context);
  const value = typeof node.attrs?.value === "string" ? node.attrs.value : "";

  const tableName = typeof node.attrs?.table_name === "string" ? node.attrs.table_name : undefined;
  const recordKey = node.attrs?.record_key;
  const referenceData = lookupReferenceData(context.references, tableName, recordKey);

  const display = children.length ? children : value;

  if (!referenceData) {
    return (
      <span key={key} className="font-semibold text-foreground">
        {display || value}
      </span>
    );
  }

  return (
    <VocabReferenceCard
      key={key}
      data={referenceData}
      tableName={tableName}
      className={context.withinRuby ? "inline" : undefined}
    >
      {display || value}
    </VocabReferenceCard>
  );
}

function normalizeContent(
  content: TiptapJSONContent | TiptapJSONContent[] | undefined
): TiptapJSONContent[] {
  if (!content) {
    return [];
  }

  return Array.isArray(content) ? content : [content];
}

function applyMarks(node: TiptapJSONContent): ReactNode {
  const output: ReactNode = node.text ?? "";

  if (!node.marks?.length) {
    return output;
  }

  return node.marks.reduce<ReactNode>((acc, mark) => {
    switch (mark.type) {
      case "underline":
        return <span className={underlineClasses}>{acc}</span>;

      default:
        return acc;
    }
  }, output);
}

function lookupReferenceData(
  references: TiptapReferenceMap | undefined,
  tableName: string | undefined,
  recordKey: unknown
): Record<string, unknown> | undefined {
  if (!references || !tableName) {
    return undefined;
  }

  if (recordKey === undefined || recordKey === null) {
    return undefined;
  }

  const tableReferences = references[tableName];

  if (!tableReferences) {
    return undefined;
  }

  const key = typeof recordKey === "string" ? recordKey : String(recordKey);
  return tableReferences[key];
}
