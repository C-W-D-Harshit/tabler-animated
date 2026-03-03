import * as fs from "node:fs";
import * as path from "node:path";

const TEMPLATE = (
  name: string,
  title: string,
  svgContent: string,
) => `"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
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
  ({ size = 24, strokeWidth = 2, color = "currentColor", ...props }, ref) => {
    const controls = useAnimation();
    const isAnimatingRef = useRef(false);

    const startAnimation = useCallback(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      controls.start("animate");
    }, [controls]);

    const stopAnimation = useCallback(() => {
      isAnimatingRef.current = false;
      controls.start("normal");
    }, [controls]);

    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }));

    return (
      <div 
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={startAnimation}
        onMouseLeave={stopAnimation}
        role="button"
        tabIndex={0}
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
          <title>${title}</title>
${svgContent}
        </svg>
      </div>
    );
  },
);

Animated${name}.displayName = "Animated${name}";

export default Animated${name};
`;

const ICONS = {
  check: {
    name: "Check",
    title: "Check",
    content: `          <motion.path
            d="M5 12l5 5l10 -10"
            variants={{
              normal: { opacity: 1, pathLength: 1, scale: 1 },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                scale: [0.5, 1],
                transition: {
                  duration: 0.4,
                  opacity: { duration: 0.1 }
                }
              }
            }}
            initial="normal"
            animate={controls}
          />`,
  },
  "chevron-down": {
    name: "ChevronDown",
    title: "Chevron Down",
    content: `          <motion.path
            d="M6 9l6 6l6 -6"
            variants={{
              normal: { y: 0 },
              animate: { 
                y: [0, 2, 0],
                transition: { times: [0, 0.4, 1], duration: 0.5 }
              }
            }}
            animate={controls}
          />`,
  },
  heart: {
    name: "Heart",
    title: "Heart",
    content: `          <motion.path
            d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
            variants={{
              normal: { scale: 1 },
              animate: { 
                scale: [1, 1.08, 1],
                transition: { duration: 0.45, repeat: 1 }
              }
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
          />`,
  },
  menu: {
    name: "Menu",
    title: "Menu",
    content: `          <motion.path
            d="M4 8l16 0"
            variants={{
              normal: { y: 0, scaleX: 1 },
              animate: { y: [0, -1, 0], scaleX: [1, 1.05, 1] }
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M4 16l16 0"
            variants={{
              normal: { y: 0, scaleX: 1 },
              animate: { y: [0, 1, 0], scaleX: [1, 0.95, 1] }
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />`,
  },
  search: {
    name: "Search",
    title: "Search",
    content: `          <motion.g
            variants={{
              normal: { rotate: 0, scale: 1 },
              animate: { 
                rotate: [0, -10, 10, -5, 5, 0], 
                scale: [1, 1.05, 1],
                transition: { duration: 0.6, ease: "easeInOut" }
              }
            }}
            style={{ transformOrigin: "10px 10px" }}
            animate={controls}
          >
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </motion.g>`,
  },
  star: {
    name: "Star",
    title: "Star",
    content: `          <motion.path
            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245"
            variants={{
              normal: { scale: 1, rotate: 0 },
              animate: { 
                scale: [1, 1.15, 1], 
                rotate: [0, 15, -10, 5, 0],
                transition: { duration: 0.6, ease: "easeInOut" }
              }
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
          />`,
  },
  sun: {
    name: "Sun",
    title: "Sun",
    content: `          <motion.g
            variants={{
              normal: { rotate: 0, scale: 1 },
              animate: { 
                rotate: [0, 90], 
                scale: [1, 1.1, 1],
                transition: { duration: 0.8, ease: "easeInOut" }
              }
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
          >
            <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </motion.g>`,
  },
  moon: {
    name: "Moon",
    title: "Moon",
    content: `          <motion.path
            d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008"
            variants={{
              normal: { rotate: 0, scale: 1 },
              animate: { 
                rotate: [0, -15, 10, -5, 0], 
                scale: [1, 1.05, 1],
                transition: { duration: 0.6, ease: "easeInOut" }
              }
            }}
            style={{ transformOrigin: "12px 12px" }}
            animate={controls}
          />`,
  },
  trash: {
    name: "Trash",
    title: "Trash",
    content: `          <motion.g
            variants={{
              normal: { y: 0, rotate: 0 },
              animate: { 
                y: [0, -3, 0], 
                rotate: [0, -8, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }
            }}
            style={{ transformOrigin: "12px 10px" }}
            animate={controls}
          >
            <path d="M4 7l16 0" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </motion.g>
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />`,
  },
  user: {
    name: "User",
    title: "User",
    content: `          <motion.path
            d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
            variants={{
              normal: { pathLength: 1, opacity: 1, scale: 1 },
              animate: { 
                pathLength: [0, 1],
                opacity: [0, 1],
                scale: [0.8, 1],
                transition: { duration: 0.4, ease: "easeOut" }
              }
            }}
            style={{ transformOrigin: "12px 7px" }}
            initial="normal"
            animate={controls}
          />
          <motion.path 
            d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" 
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: { 
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.4, ease: "easeOut", delay: 0.1 }
              }
            }}
            initial="normal"
            animate={controls}
          />`,
  },
};

for (const [key, data] of Object.entries(ICONS)) {
  const filePath = path.resolve(__dirname, "../src/icons", `${key}.tsx`);
  fs.writeFileSync(filePath, TEMPLATE(data.name, data.title, data.content));
  console.log(`Created ${filePath}`);
}
