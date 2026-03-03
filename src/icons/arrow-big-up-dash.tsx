"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const ArrowBigUpDash_DASH_VARIANTS: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigUpDash_ARROW_VARIANTS: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
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

const AnimatedArrowBigUpDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>ArrowBigUpDash</title>
<motion.path animate={controls} d="M9 19h6" variants={ArrowBigUpDash_DASH_VARIANTS} />
        <motion.path
          animate={controls}
          d="M9 15v-3H5l7-7 7 7h-4v3H9z"
          variants={ArrowBigUpDash_ARROW_VARIANTS}
        />
        </svg>
      </div>
    );
  },
);

AnimatedArrowBigUpDash.displayName = "AnimatedArrowBigUpDash";

export default AnimatedArrowBigUpDash;
