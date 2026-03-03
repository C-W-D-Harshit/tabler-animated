"use client";

import * as TablerIcons from "@tabler/icons-react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { memo, Suspense, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import type { AnimatedIconHandle } from "@/icons";
import { animatedComponentMap } from "@/icons";
import type { IconEntry } from "@/icons/registry";
import { cn } from "@/lib/utils";

interface IconCardProps {
  entry: IconEntry;
}

function StaticIcon({
  componentName,
  size = 24,
}: {
  componentName: string;
  size?: number;
}) {
  const Icon = (
    TablerIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number }>
    >
  )[componentName];
  if (!Icon) return null;
  return <Icon size={size} />;
}

export const IconCard = memo(function IconCard({ entry }: IconCardProps) {
  const [copied, setCopied] = useState(false);
  const animatedRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    if (entry.animated) {
      animatedRef.current?.startAnimation();
    }
  }, [entry.animated]);

  const handleMouseLeave = useCallback(() => {
    if (entry.animated) {
      animatedRef.current?.stopAnimation();
    }
  }, [entry.animated]);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(entry.componentName);
      setCopied(true);
      toast.success(`Copied "${entry.componentName}"`);
      setTimeout(() => setCopied(false), 1500);
    },
    [entry.componentName],
  );

  const AnimatedComponent = entry.animated
    ? animatedComponentMap[entry.name]
    : null;

  return (
    // biome-ignore lint: hover events for animation triggers
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center gap-2.5 rounded-xl border border-transparent p-3 pt-4 transition-all duration-150",
        "hover:border-border hover:bg-accent/60",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {entry.animated && (
        <div className="absolute left-1.5 top-1.5">
          <span className="inline-flex items-center rounded-md bg-foreground/[0.07] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-foreground/50">
            animated
          </span>
        </div>
      )}

      <div className="flex size-8 items-center justify-center text-foreground/80 transition-colors group-hover:text-foreground">
        {entry.animated && AnimatedComponent ? (
          <Suspense
            fallback={
              <StaticIcon componentName={entry.componentName} size={24} />
            }
          >
            <AnimatedComponent ref={animatedRef} size={24} />
          </Suspense>
        ) : (
          <StaticIcon componentName={entry.componentName} size={24} />
        )}
      </div>

      <span className="max-w-full truncate text-[11px] leading-none text-muted-foreground/70 transition-colors group-hover:text-muted-foreground">
        {entry.name}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-1.5 bottom-1.5 rounded-md p-1 text-muted-foreground/50 opacity-0 transition-all hover:text-foreground group-hover:opacity-100"
        aria-label={`Copy ${entry.componentName}`}
      >
        {copied ? (
          <IconCheck className="size-3 text-emerald-500" />
        ) : (
          <IconCopy className="size-3" />
        )}
      </button>
    </div>
  );
});
