'use client';

import { useCallback, useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function HoverCard({
  trigger,
  content,
  className,
  contentClassName,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      <span
        tabIndex={0}
        aria-describedby={open ? triggerId : undefined}
        className="cursor-help rounded-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
      >
        {trigger}
      </span>

      {open ? (
        <span
          id={triggerId}
          role="tooltip"
          className={cn(
            "absolute left-1/2 top-full z-20 mt-2 w-max max-w-xs -translate-x-1/2 rounded-xl border border-border bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            contentClassName
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
