import { IconList } from "@/components/icon-list";
import { totalAnimated, totalIcons } from "@/icons/registry";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Beautifully crafted animated icons
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Hand-made SVG animations for{" "}
            <a
              href="https://tabler.io/icons"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Tabler Icons
            </a>
            , one batch at a time. {totalAnimated} of {totalIcons} icons
            animated so far.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <IconList />
      </section>
    </div>
  );
}
