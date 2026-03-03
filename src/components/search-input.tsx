"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export function SearchInput({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons..."
        className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <IconX className="size-4" />
        </button>
      )}
      {resultCount !== undefined && totalCount !== undefined && (
        <p className="mt-2 text-xs text-muted-foreground">
          {value
            ? `${resultCount} result${resultCount !== 1 ? "s" : ""} found`
            : `${totalCount} icons available`}
        </p>
      )}
    </div>
  );
}
