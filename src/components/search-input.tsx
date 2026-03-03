"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <IconSearch className="size-[18px] text-muted-foreground/60" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search 5,000+ icons..."
        className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-[15px] shadow-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          <IconX className="size-4" />
        </button>
      )}
    </div>
  );
}
