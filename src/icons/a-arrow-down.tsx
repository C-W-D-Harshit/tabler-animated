"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const AArrowDown_LETTER_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [0, 1],
    scale: [0.8, 1],
    transition: { duration: 0.3 },
  },
};

const AArrowDown_ARROW_VARIANTS: Variants = {
  normal: { opacity: 1, y: 0 },
  animate: {
    opacity: [0, 1],
    y: [-10, 0],
    transition: { duration: 0.3, delay: 0.2 },
  },
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

const AnimatedAArrowDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>AArrowDown</title>
<motion.path
            animate={controls}
            d="M3.5 13h6"
            variants={AArrowDown_LETTER_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m2 16 4.5-9 4.5 9"
            variants={AArrowDown_LETTER_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M18 7v9"
            variants={AArrowDown_ARROW_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m14 12 4 4 4-4"
            variants={AArrowDown_ARROW_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

AnimatedAArrowDown.displayName = "AnimatedAArrowDown";

export default AnimatedAArrowDown;
