import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  href: string;
  project: {
    name: string;
    description?: string;
    language?: string;
  };
  createdAt?: string;
}

export default function CourseCard({ href, project, createdAt }: CourseCardProps) {
  const description = project.description?.trim().length
    ? project.description
    : project.language
      ? `A ${project.language} course.`
      : "Course details coming soon.";
  const formattedCreatedAt = formatDate(createdAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" asChild>
            <Link href={href} aria-label={`Go to ${project.name}`}>
              <ChevronRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <dt className="font-medium text-foreground">Language</dt>
            <dd>{project.language ?? "Unknown"}</dd>
          </div>
          {formattedCreatedAt ? (
            <div className="flex items-center justify-between gap-2">
              <dt className="font-medium text-foreground">Created</dt>
              <dd>{formattedCreatedAt}</dd>
            </div>
          ) : null}
        </dl>
      </CardContent>
    </Card>
  );
}

function formatDate(isoDate?: string) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
