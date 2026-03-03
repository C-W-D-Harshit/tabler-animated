import { IconBrandGithub, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <IconSparkles className="size-5 text-primary" />
          <span className="font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
