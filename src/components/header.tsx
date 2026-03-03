"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled}
      className="fixed top-0 z-50 w-full border-b border-transparent bg-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-border/40 data-[scrolled=true]:bg-background/80 data-[scrolled=true]:backdrop-blur-lg"
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          >
            <title>Logo</title>
            <path d="M12 3l-8 4.5v9l8 4.5l8 -4.5v-9z" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12v9" />
            <path d="M12 12l-8 -4.5" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground data-[scrolled=true]:hover:bg-accent"
            data-scrolled={scrolled}
          >
            <IconBrandGithub className="size-[18px]" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
