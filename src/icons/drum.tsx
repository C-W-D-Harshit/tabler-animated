"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Drum_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: (custom: number) => ({
    rotate: custom === 1 ? [-10, 10, 0] : [10, -10, 0],
    transition: {
      delay: 0.1 * custom,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      duration: 0.5,
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

const AnimatedDrum = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Drum</title>
<motion.path
            animate={controls}
            custom={1}
            d="m2 2 8 8"
            variants={Drum_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={2}
            d="m22 2-8 8"
            variants={Drum_VARIANTS}
          />
          <ellipse cx="12" cy="9" rx="10" ry="5" />
          <path d="M7 13.4v7.9" />
          <path d="M12 14v8" />
          <path d="M17 13.4v7.9" />
          <path d="M2 9v8a10 5 0 0 0 20 0V9" />
        </svg>
      </div>
    );
  },
);

AnimatedDrum.displayName = "AnimatedDrum";

export default AnimatedDrum;
