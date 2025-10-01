import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DownloadBuild, DownloadPlatform } from "@/config/site";
import { cn } from "@/lib/utils";
import { Apple, Laptop, type LucideIcon } from "lucide-react";

const PLATFORM_ICON: Record<DownloadPlatform, LucideIcon> = {
  mac: Apple,
  windows: Laptop,
};

export interface DownloadCardProps {
  platform: DownloadPlatform;
  title: string;
  description: string;
  version?: string;
  releaseNotesHref?: string;
  build: DownloadBuild;
  className?: string;
}

export default function DownloadCard({
  platform,
  title,
  description,
  version,
  releaseNotesHref,
  build,
  className,
}: DownloadCardProps) {
  const Icon = PLATFORM_ICON[platform];
  const label = build.label ??
    (platform === "mac" ? "Download for macOS" : "Download for Windows");
  const isExternal = build.external ?? build.href.startsWith("http");

  return (
    <Card className={cn("border-border/60 bg-card", className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-foreground">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span>{title}</span>
          </CardTitle>
          {version ? (
            <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
              v{version}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Button asChild size="lg">
            <a
              href={build.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {label}
            </a>
          </Button>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {build.fileSize ? <span>{build.fileSize}</span> : null}
            {build.checksumHref ? (
              <a
                href={build.checksumHref}
                className="underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Verify checksum
              </a>
            ) : null}
          </div>
        </div>
        {releaseNotesHref ? (
          <div className="text-sm text-muted-foreground">
            <a
              href={releaseNotesHref}
              className="underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              View release notes
            </a>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
