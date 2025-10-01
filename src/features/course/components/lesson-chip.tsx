import { BookText } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const variantStyles = {
  green:
    "bg-green-600 border border-3 border-green-800 border-b-8 hover:border-b-3 text-white transition-all",
  yellow:
    "bg-yellow-400 border border-3 border-yellow-600 border-b-8 hover:border-b-3 text-yellow-800 transition-all",
  blue: "bg-blue-600 border border-3 border-blue-800 border-b-8 hover:border-b-3 text-white transition-all",
  neutral: "bg-gradient-to-b from-neutral-200 to-neutral-300 text-neutral-700",
} as const;

interface LessonChipProps {
  title: string;
  href?: string;
  icon?: ReactNode;
  variant?: keyof typeof variantStyles;
  className?: string;
}

export default function LessonChip({
  title,
  href,
  icon,
  variant = "green",
  className,
}: LessonChipProps) {
  const tile = (
    <div
      className={cn(
        "flex flex-col items-center px-6 py-6 text-center transition",
        className
      )}
    >
      <span
        className={cn(
          "grid size-16 place-items-center rounded-2xl",
          variantStyles[variant]
        )}
      >
        {icon ?? <BookText className="size-7" aria-hidden="true" />}
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground mt-4 max-w-30">{title}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
      >
        {tile}
      </Link>
    );
  }

  return tile;
}
