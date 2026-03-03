"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Delete_SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const Delete_LID_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: -1.1 },
};

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

const AnimatedDelete = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Delete</title>
<motion.g
            animate={controls}
            transition={Delete_SPRING_TRANSITION}
            variants={Delete_LID_VARIANTS}
          >
            <path d="M3 6h18" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </motion.g>
          <motion.path
            animate={controls}
            d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8"
            transition={Delete_SPRING_TRANSITION}
            variants={{
              normal: { d: "M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" },
              animate: { d: "M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9" },
            }}
          />
          <motion.line
            animate={controls}
            transition={Delete_SPRING_TRANSITION}
            variants={{
              normal: { y1: 11, y2: 17 },
              animate: { y1: 11.5, y2: 17.5 },
            }}
            x1="10"
            x2="10"
            y1="11"
            y2="17"
          />
          <motion.line
            animate={controls}
            transition={Delete_SPRING_TRANSITION}
            variants={{
              normal: { y1: 11, y2: 17 },
              animate: { y1: 11.5, y2: 17.5 },
            }}
            x1="14"
            x2="14"
            y1="11"
            y2="17"
          />
        </svg>
      </div>
    );
  },
);

AnimatedDelete.displayName = "AnimatedDelete";

export default AnimatedDelete;
