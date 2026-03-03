import { siteConfig } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a
            href={siteConfig.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {siteConfig.author.name}
          </a>
          . Icons by{" "}
          <a
            href={siteConfig.links.tabler}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Tabler
          </a>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
