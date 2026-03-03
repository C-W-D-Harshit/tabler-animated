"use client";

import { IconSparkles } from "@tabler/icons-react";
import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";
import { IconCard } from "@/components/icon-card";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import type { IconEntry } from "@/icons/registry";
import { iconRegistry, totalAnimated, totalIcons } from "@/icons/registry";

const fuse = new Fuse(iconRegistry, {
  keys: ["name", "keywords"],
  threshold: 0.3,
  includeScore: true,
});

const PAGE_SIZE = 120;

export function IconList() {
  const [query, setQuery] = useState("");
  const [showAnimatedOnly, setShowAnimatedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
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

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={handleSearch}
            resultCount={filtered.length}
            totalCount={totalIcons}
          />
        </div>
        <Button
          variant={showAnimatedOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAnimatedOnly(!showAnimatedOnly)}
          className="shrink-0"
        >
          <IconSparkles className="size-3.5" />
          Animated ({totalAnimated})
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            No icons found
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            Try a different search term
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {visible.map((entry) => (
              <IconCard key={entry.name} entry={entry} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={loadMore}>
                Load more ({filtered.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
