import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type RoadmapStatus = "planned" | "in-progress" | "completed";

const STATUS_BADGES: Record<
  RoadmapStatus,
  { label: string; badgeClassName: string }
> = {
  planned: {
    label: "Planned",
    badgeClassName:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  },
  "in-progress": {
    label: "In Progress",
    badgeClassName:
      "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
  },
  completed: {
    label: "Completed",
    badgeClassName:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  },
};

export interface RoadmapCardProps {
  title: string;
  description?: string;
  status: RoadmapStatus;
  className?: string;
}

export default function RoadmapCard({
  title,
  description,
  status,
  className,
}: RoadmapCardProps) {
  const statusBadge = STATUS_BADGES[status];

  return (
    <Card className={cn("border-border/60 bg-card max-h-max", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        {description ? (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        ) : null}
        <CardAction>
          <Badge
            aria-label={`Roadmap status: ${statusBadge.label}`}
            variant="outline"
            className={statusBadge.badgeClassName}
          >
            {statusBadge.label}
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
