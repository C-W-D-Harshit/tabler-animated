import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE_DIR = "/tmp/animated-icons/icons";
const DEST_DIR = path.resolve(__dirname, "../src/icons");

// List of 150 icons to migrate
const filesToMigrate = fs
  .readdirSync(SOURCE_DIR)
  .filter(
    (f) =>
      f.endsWith(".tsx") &&
      f !== "index.ts" &&
      f !== "home.tsx" &&
      f !== "settings.tsx" &&
      f !== "bell.tsx" &&
      f !== "check.tsx" &&
      f !== "chevron-down.tsx" &&
      f !== "heart.tsx" &&
      f !== "menu.tsx" &&
      f !== "search.tsx" &&
      f !== "star.tsx" &&
      f !== "sun.tsx" &&
      f !== "moon.tsx" &&
      f !== "trash.tsx" &&
      f !== "user.tsx",
  )
  .slice(0, 150);

const TEMPLATE = (name: string, innerContent: string) => `"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

const Animated${name} = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, strokeWidth = 2, color = "currentColor", onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>${name}</title>
${innerContent}
        </svg>
      </div>
    );
  },
);

Animated${name}.displayName = "Animated${name}";

export default Animated${name};
`;

function kebabToPascal(str: string) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

for (const file of filesToMigrate) {
  const content = fs.readFileSync(path.join(SOURCE_DIR, file), "utf-8");

  // Extract variants objects
  const variantsMap = new Map<string, string>();

  // Extract all const declarations that look like variants or arrays (for things like SPEED_LINES) or basic primitives (like DURATION = 0.5)
  const allVariantMatches = content.matchAll(
    /const ([A-Z_a-z0-9]+)(?::? [A-Z_a-z0-9<>[\]]+)? = (\{[\s\S]*?\}|\([\s\S]*?\}|\[[\s\S]*?\]|[0-9.]+|"[^"]*"|'[^']*');?\n/g,
  );

  for (const match of allVariantMatches) {
    const varName = match[1];
    // Exclude transitions since we handle them separately
    if (!varName.includes("TRANSITION") && !variantsMap.has(varName)) {
      variantsMap.set(varName, match[0]);
    }
  }

  const variantsContent = Array.from(variantsMap.values()).join("\n");

  // Extract custom transition if exists
  let transitionContent = "";
  const transitionMap = new Map<string, string>();
  const allTransitionMatches = content.matchAll(
    /const ([A-Z_a-z0-9]+): Transition = \{[\s\S]*?\};\n/g,
  );

  for (const match of allTransitionMatches) {
    const varName = match[1];
    if (!transitionMap.has(varName)) {
      transitionMap.set(varName, match[0]);
    }
  }

  transitionContent = Array.from(transitionMap.values()).join("\n");

  // Find the SVG inner content
  const svgInnerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (svgInnerMatch) {
    let innerHtml = svgInnerMatch[1]
      .replace(/<title>.*<\/title>/g, "") // Remove old title
      .trim();

    // Replace hardcoded stroke/colors/sizes with our props if any leaked into the inner elements (e.g. circles, paths)
    // Most should inherit from the SVG, but just in case

    const baseName = file.replace(".tsx", "");
    const pascalName = kebabToPascal(baseName);

    // If the whole SVG is wrapped in motion.svg, we need a different approach
    if (content.includes("<motion.svg")) {
      const motionSvgMatch = content.match(
        /<motion\.svg[^>]*>([\s\S]*?)<\/motion\.svg>/,
      );
      if (motionSvgMatch) {
        const motionSvgPropsMatch = content.match(/<motion\.svg([\s\S]*?)>/);
        const motionSvgProps = motionSvgPropsMatch
          ? motionSvgPropsMatch[1]
          : "";

        // Extract just the variants, transition, animate props from motionSvgProps
        const extractedProps = [];
        const animateProp = motionSvgProps.match(/animate=\{[^}]+\}/);
        if (animateProp) extractedProps.push(animateProp[0]);

        const transitionProp = motionSvgProps.match(/transition=\{[\s\S]*?\}/);
        if (transitionProp) extractedProps.push(transitionProp[0]);

        const variantsProp = motionSvgProps.match(/variants=\{[^}]+\}/);
        if (variantsProp) extractedProps.push(variantsProp[0]);

        const initialProp = motionSvgProps.match(/initial="[^"]+"/);
        if (initialProp) extractedProps.push(initialProp[0]);

        innerHtml = `          <motion.g ${extractedProps.join(" ")}>\n  ${motionSvgMatch[1].trim()}\n          </motion.g>`;
      }
    }

    let finalFileContent = TEMPLATE(pascalName, innerHtml);

    // If there were custom variants outside the component, inject them right before the component declaration
    if (variantsContent || transitionContent) {
      // Prefix all variants with the component name to avoid collisions
      const prefixedVariants = variantsContent.replace(
        /const ([A-Z_a-z0-9]+)/g,
        `const ${pascalName}_$1`,
      );
      let finalInnerHtml = innerHtml;

      // Ensure we extract the pure variables to replace
      const variantNamesToReplace = Array.from(
        variantsContent.matchAll(/const ([A-Z_a-z0-9]+)/g),
      ).map((m) => m[1]);

      // Update the references in the innerHTML
      for (const varName of variantNamesToReplace) {
        finalInnerHtml = finalInnerHtml.replace(
          new RegExp(`variants=\\{${varName}\\}`, "g"),
          `variants={${pascalName}_${varName}}`,
        );
        finalInnerHtml = finalInnerHtml.replace(
          new RegExp(`\\{${varName}\\.map`, "g"),
          `{${pascalName}_${varName}.map`,
        );
        finalInnerHtml = finalInnerHtml.replace(
          new RegExp(`duration: ${varName}`, "g"),
          `duration: ${pascalName}_${varName}`,
        );
      }

      let prefixedTransition = "";
      if (transitionContent) {
        const transitionNamesToReplace = Array.from(
          transitionContent.matchAll(/const ([A-Z_a-z0-9]+)/g),
        ).map((m) => m[1]);
        prefixedTransition = transitionContent.replace(
          /const ([A-Z_a-z0-9]+)/g,
          `const ${pascalName}_$1`,
        );
        for (const varName of transitionNamesToReplace) {
          finalInnerHtml = finalInnerHtml.replace(
            new RegExp(`transition=\\{${varName}\\}`, "g"),
            `transition={${pascalName}_${varName}}`,
          );
        }
      }

      finalFileContent = TEMPLATE(pascalName, finalInnerHtml);

      finalFileContent = finalFileContent.replace(
        "export interface AnimatedIconHandle",
        `${prefixedTransition ? `${prefixedTransition}\n` : ""}${prefixedVariants}\nexport interface AnimatedIconHandle`,
      );

      // Ensure Transition type is imported if used
      if (transitionContent && !finalFileContent.includes("type Transition")) {
        finalFileContent = finalFileContent.replace(
          'import type { Variants } from "motion/react";',
          'import type { Transition, Variants } from "motion/react";',
        );
      }
    }

    fs.writeFileSync(path.join(DEST_DIR, file), finalFileContent);
    console.log(`Migrated ${file}`);
  }
}
