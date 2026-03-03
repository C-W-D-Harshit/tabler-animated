"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type * as React from "react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const CursorClick_CURSOR_VARIANTS: Variants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 0, -3, 0],
    y: [0, -4, 0, 0],
    transition: {
      duration: 1,
      bounce: 0.3,
    },
  },
};

const CursorClick_LINE_VARIANTS: Variants = {
  initial: { opacity: 1, x: 0, y: 0 },
  spread: (custom: { x: number; y: number }) => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    x: [0, custom.x, 0, 0],
    y: [0, custom.y, 0, 0],
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      mass: 0.4,
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

const AnimatedCursorClick = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>CursorClick</title>
          <motion.path
            animate={controls}
            d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
            variants={CursorClick_CURSOR_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: 1, y: -1 }}
            d="M14 4.1 12 6"
            variants={CursorClick_LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: -1, y: 0 }}
            d="m5.1 8-2.9-.8"
            variants={CursorClick_LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: -1, y: 1 }}
            d="m6 12-1.9 2"
            variants={CursorClick_LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: 0, y: -1 }}
            d="M7.2 2.2 8 5.1"
            variants={CursorClick_LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

AnimatedCursorClick.displayName = "AnimatedCursorClick";

export default AnimatedCursorClick;
