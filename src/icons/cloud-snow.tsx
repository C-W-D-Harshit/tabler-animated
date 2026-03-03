"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const CloudSnow_SNOWFLAKE_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const CloudSnow_SNOWFLAKE_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const CloudSnow_SNOWFLAKE_PATH = [
  { id: "snowflake1", d: "M8 15h.01" },
  { id: "snowflake2", d: "M8 19h.01" },
  { id: "snowflake3", d: "M12 17h.01" },
  { id: "snowflake4", d: "M12 21h.01" },
  { id: "snowflake5", d: "M16 15h.01" },
  { id: "snowflake6", d: "M16 19h.01" },
];

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

const AnimatedCloudSnow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>CloudSnow</title>
<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <motion.g
            animate={controls}
            initial="normal"
            variants={CloudSnow_SNOWFLAKE_VARIANTS}
          >
            {CloudSnow_SNOWFLAKE_PATH.map((path) => (
              <motion.path
                d={path.d}
                key={path.id}
                variants={CloudSnow_SNOWFLAKE_CHILD_VARIANTS}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  },
);

AnimatedCloudSnow.displayName = "AnimatedCloudSnow";

export default AnimatedCloudSnow;
