"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const ChartColumnIncreasing_LINE_VARIANTS: Variants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
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

const AnimatedChartColumnIncreasing = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>ChartColumnIncreasing</title>
<motion.path
          animate={controls}
          custom={1}
          d="M13 17V9"
          initial="visible"
          variants={ChartColumnIncreasing_LINE_VARIANTS}
        />
        <motion.path
          animate={controls}
          custom={2}
          d="M18 17V5"
          initial="visible"
          variants={ChartColumnIncreasing_LINE_VARIANTS}
        />
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <motion.path
          animate={controls}
          custom={0}
          d="M8 17v-3"
          initial="visible"
          variants={ChartColumnIncreasing_LINE_VARIANTS}
        />
        </svg>
      </div>
    );
  },
);

AnimatedChartColumnIncreasing.displayName = "AnimatedChartColumnIncreasing";

export default AnimatedChartColumnIncreasing;
