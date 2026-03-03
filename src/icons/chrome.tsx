"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type * as React from "react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Chrome_TRANSITION: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const Chrome_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...Chrome_TRANSITION,
      delay: 0.1 * custom,
    },
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

const AnimatedChrome = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    {
      size = 24,
      strokeWidth = 2,
      color = "currentColor",
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
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
          <title>Chrome</title>
          <circle cx="12" cy="12" r="10" />
          <motion.circle
            animate={controls}
            custom={0}
            cx="12"
            cy="12"
            r="4"
            variants={Chrome_VARIANTS}
          />
          <motion.line
            animate={controls}
            custom={3}
            variants={Chrome_VARIANTS}
            x1="21.17"
            x2="12"
            y1="8"
            y2="8"
          />
          <motion.line
            animate={controls}
            custom={3}
            variants={Chrome_VARIANTS}
            x1="3.95"
            x2="8.54"
            y1="6.06"
            y2="14"
          />
          <motion.line
            animate={controls}
            custom={3}
            variants={Chrome_VARIANTS}
            x1="10.88"
            x2="15.46"
            y1="21.94"
            y2="14"
          />
        </svg>
      </div>
    );
  },
);

AnimatedChrome.displayName = "AnimatedChrome";

export default AnimatedChrome;
