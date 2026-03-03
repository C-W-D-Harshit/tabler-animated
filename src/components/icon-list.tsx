"use client";

import { IconSparkles } from "@tabler/icons-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Fuse from "fuse.js";
import { useQueryState } from "nuqs";
import { useCallback, useMemo, useRef, useState } from "react";
import { IconCard } from "@/components/icon-card";
import { SearchInput } from "@/components/search-input";
import type { IconEntry } from "@/icons/registry";
import { iconRegistry, totalAnimated } from "@/icons/registry";
import { cn } from "@/lib/utils";

const fuse = new Fuse(iconRegistry, {
  keys: [
    { name: "name", weight: 2 },
    { name: "keywords", weight: 1.5 },
    { name: "tags", weight: 1 },
    { name: "category", weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
});

const BATCH_SIZE = 120;

function useColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(8);

  const updateColumns = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    // Each card ~110px minimum
    const cols = Math.max(3, Math.floor(w / 110));
    setColumns(cols);
  }, []);

  // Observe resize of the container
  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (!node) return;
      updateColumns();
      const observer = new ResizeObserver(updateColumns);
      observer.observe(node);
      return () => observer.disconnect();
    },
    [updateColumns],
  );

  return { columns, containerRef };
}

export function IconList() {
  const [query, setQuery] = useQueryState("q", { defaultValue: "" });
  const [showAnimatedOnly, setShowAnimatedOnly] = useState(false);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { columns, containerRef } = useColumns();

  // Full filtered set (array of references -- cheap to compute)
  const allFiltered = useMemo(() => {
    let results: IconEntry[];

    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    } else {
      results = iconRegistry;
    }

    if (showAnimatedOnly) {
      results = results.filter((entry) => entry.animated);
    }

    return results;
  }, [query, showAnimatedOnly]);

  // Reset loaded count when filter changes (use a ref to track previous)
  const prevQueryRef = useRef(query);
  const prevAnimatedRef = useRef(showAnimatedOnly);
  if (
    prevQueryRef.current !== query ||
    prevAnimatedRef.current !== showAnimatedOnly
  ) {
    prevQueryRef.current = query;
    prevAnimatedRef.current = showAnimatedOnly;
    // This is safe: we're resetting state during render before commit
    // React will re-render with the new value
    if (loadedCount !== BATCH_SIZE) {
      setLoadedCount(BATCH_SIZE);
    }
  }

  // Progressively loaded slice
  const loaded = useMemo(
    () => allFiltered.slice(0, loadedCount),
    [allFiltered, loadedCount],
  );

  const hasMore = loadedCount < allFiltered.length;
  const rowCount = Math.ceil(loaded.length / columns);
  const ROW_HEIGHT = 100;

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
  });

  // Check if we need to load more after virtualizer renders
  const virtualItems = virtualizer.getVirtualItems();
  const lastVirtualItem =
    virtualItems.length > 0 ? virtualItems[virtualItems.length - 1] : null;

  // Load more when scrolled near the bottom
  if (lastVirtualItem && lastVirtualItem.index >= rowCount - 3 && hasMore) {
    // Schedule the state update for next microtask to avoid setState during render
    queueMicrotask(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, allFiltered.length));
    });
  }

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value || null);
    },
    [setQuery],
  );

  const resultText = useMemo(() => {
    if (!query.trim()) return null;
    const count = allFiltered.length;
    return `${count} result${count !== 1 ? "s" : ""}`;
  }, [query, allFiltered.length]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Search toolbar */}
      <div className="sticky top-14 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 py-4">
          <div className="flex-1">
            <SearchInput value={query} onChange={handleSearch} />
          </div>
          <button
            type="button"
            onClick={() => setShowAnimatedOnly(!showAnimatedOnly)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all",
              showAnimatedOnly
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border bg-card text-muted-foreground shadow-sm hover:border-foreground/20 hover:text-foreground",
            )}
          >
            <IconSparkles className="size-4" />
            <span className="hidden sm:inline">Animated</span>
            <span className="tabular-nums">({totalAnimated})</span>
          </button>
        </div>
        {resultText && (
          <div className="-mt-1 pb-3">
            <span className="text-xs text-muted-foreground/60">
              {resultText}
            </span>
          </div>
        )}
      </div>

      {/* Virtualized grid with scroll-based progressive loading */}
      {allFiltered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-base font-medium text-muted-foreground/60">
            No icons found
          </p>
          <p className="text-sm text-muted-foreground/40">
            Try a different search term
          </p>
        </div>
      ) : (
        <div
          ref={(node) => {
            (
              scrollRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            containerRef(node);
          }}
          className="flex-1 overflow-y-auto"
          style={{ contain: "strict" }}
        >
          <div
            style={{
              height: virtualizer.getTotalSize(),
              width: "100%",
              position: "relative",
            }}
          >
            {virtualItems.map((virtualRow) => {
              const startIndex = virtualRow.index * columns;
              const rowItems = loaded.slice(startIndex, startIndex + columns);

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div
                    className="grid h-full gap-px"
                    style={{
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    }}
                  >
                    {rowItems.map((entry) => (
                      <IconCard key={entry.name} entry={entry} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground/60" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
