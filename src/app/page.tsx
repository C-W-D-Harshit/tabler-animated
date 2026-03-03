import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { IconList } from "@/components/icon-list";

export default function Home() {
  return (
    <>
      <Hero />
      <div
        id="icon-grid"
        className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-4 pt-20 sm:px-6 lg:px-8"
      >
        <Suspense>
          <IconList />
        </Suspense>
      </div>
    </>
  );
}
