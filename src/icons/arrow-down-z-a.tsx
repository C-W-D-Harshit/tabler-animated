"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const ArrowDownZA_SWAP_TRANSITION: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 24,
};

const ArrowDownZA_SWAP_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: (custom: number) => ({
    translateY: custom * 10,
  }),
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

const AnimatedArrowDownZA = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>ArrowDownZA</title>
<path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <motion.path
            animate={controls}
            custom={1}
            d="M15 4h5l-5 6h5"
            initial="normal"
            transition={ArrowDownZA_SWAP_TRANSITION}
            variants={ArrowDownZA_SWAP_VARIANTS}
          />
          <motion.g
            animate={controls}
            custom={-1}
            initial="normal"
            transition={ArrowDownZA_SWAP_TRANSITION}
            variants={ArrowDownZA_SWAP_VARIANTS}
          >
            <path d="M20 18h-5" />
            <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
          </motion.g>
        </svg>
      </div>
    );
  },
);

AnimatedArrowDownZA.displayName = "AnimatedArrowDownZA";

export default AnimatedArrowDownZA;
