"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type * as React from "react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Dribbble_CIRCLE_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const Dribbble_PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
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

const AnimatedDribbble = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Dribbble</title>
          <motion.circle
            animate={controls}
            cx="12"
            cy="12"
            initial="normal"
            r="10"
            variants={Dribbble_CIRCLE_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
            initial="normal"
            variants={Dribbble_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
            initial="normal"
            variants={Dribbble_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M8.56 2.75c4.37 6 6 9.42 8 17.72"
            initial="normal"
            variants={Dribbble_PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

AnimatedDribbble.displayName = "AnimatedDribbble";

export default AnimatedDribbble;
