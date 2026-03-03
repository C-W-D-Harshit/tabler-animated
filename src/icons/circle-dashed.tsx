"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const CircleDashed_PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
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

const AnimatedCircleDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>CircleDashed</title>
{[
          "M10.1 2.182a10 10 0 0 1 3.8 0",
          "M13.9 21.818a10 10 0 0 1-3.8 0",
          "M17.609 3.721a10 10 0 0 1 2.69 2.7",
          "M2.182 13.9a10 10 0 0 1 0-3.8",
          "M20.279 17.609a10 10 0 0 1-2.7 2.69",
          "M21.818 10.1a10 10 0 0 1 0 3.8",
          "M3.721 6.391a10 10 0 0 1 2.7-2.69",
          "M6.391 20.279a10 10 0 0 1-2.69-2.7",
        ].map((d, index) => (
          <motion.path
            animate={controls}
            custom={index + 1}
            d={d}
            key={d}
            variants={CircleDashed_PATH_VARIANTS}
          />
        ))}
        </svg>
      </div>
    );
  },
);

AnimatedCircleDashed.displayName = "AnimatedCircleDashed";

export default AnimatedCircleDashed;
