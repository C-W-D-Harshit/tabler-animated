import * as fs from "node:fs";
import * as path from "node:path";

const ICONS_DIR = path.resolve(__dirname, "../src/icons");

const files = fs
  .readdirSync(ICONS_DIR)
  .filter((f) => f.endsWith(".tsx") && f !== "index.ts");

const exports = [];
const lazys = [];

for (const file of files) {
  const name = file.replace(".tsx", "");
  const pascalName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  exports.push(`export { default as Animated${pascalName} } from "./${name}";`);
  lazys.push(`  "${name}": lazy(() => import("./${name}")),`);
}

const INDEX_CONTENT = `// Barrel export for all hand-crafted animated icon components.
// Update this file when adding new animated icons.

${exports.join("\n")}

// Re-export the handle type for consumers
export type { AnimatedIconHandle, AnimatedIconProps } from "./home";

// Map of icon name -> lazy-loaded animated component
// Used by IconCard to dynamically render the correct animated version
import type { ComponentType } from "react";
import { lazy } from "react";
import type { AnimatedIconHandle as Handle, AnimatedIconProps as Props } from "./home";

type AnimatedComponent = ComponentType<
  Props & { ref?: React.Ref<Handle> }
>;

export const animatedComponentMap: Record<string, AnimatedComponent> = {
${lazys.join("\n")}
};
`;

fs.writeFileSync(path.join(ICONS_DIR, "index.ts"), INDEX_CONTENT);
console.log("Updated index.ts");
