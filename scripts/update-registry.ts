import * as fs from "node:fs";
import * as path from "node:path";

const REGISTRY_SCRIPT = path.resolve(__dirname, "generate-registry.ts");
const ICONS_DIR = path.resolve(__dirname, "../rc/icons");

const files = fs
  .readdirSync(ICONS_DIR)
  .filter((f) => f.endsWith(".tsx") && f !== "index.ts")
  .map((f) => `"${f.replace(".tsx", "")}"`);

const content = fs.readFileSync(REGISTRY_SCRIPT, "utf-8");
const newContent = content.replace(
  /const ANIMATED_ICONS = new Set\(\[.*?\]\);/,
  `const ANIMATED_ICONS = new Set([\n  ${files.join(",\n  ")}\n]);`,
);

fs.writeFileSync(REGISTRY_SCRIPT, newContent);
console.log("Updated generate-registry.ts");
