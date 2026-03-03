"use client";

import * as TablerIcons from "@tabler/icons-react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Suspense, useCallback, useRef, useState } from "react";
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

export function IconCard({ entry }: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const animatedRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (entry.animated) {
      animatedRef.current?.startAnimation();
    }
  }, [entry.animated]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (entry.animated) {
      animatedRef.current?.stopAnimation();
    }
  }, [entry.animated]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(entry.componentName);
    setCopied(true);
    toast.success(`Copied "${entry.componentName}" to clipboard`);
    setTimeout(() => setCopied(false), 1500);
  }, [entry.componentName]);

  const AnimatedComponent = entry.animated
    ? animatedComponentMap[entry.name]
    : null;

  return (
    // biome-ignore lint: hover events for animation preview, not interactive
    <div
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 transition-all",
        "hover:border-border hover:bg-accent/50 hover:shadow-sm",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {entry.animated && (
        <span className="absolute right-2 top-2 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
          animated
        </span>
      )}

      <div className="flex h-10 w-10 items-center justify-center text-foreground">
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

      <span className="max-w-full truncate text-xs text-muted-foreground">
        {entry.name}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "absolute right-1.5 bottom-1.5 rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:text-foreground",
          isHovered && "opacity-100",
        )}
        aria-label={`Copy ${entry.componentName}`}
      >
        {copied ? (
          <IconCheck className="size-3.5 text-green-500" />
        ) : (
          <IconCopy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
