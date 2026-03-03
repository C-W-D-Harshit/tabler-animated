"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Cpu_TRANSITION: Transition = {
  duration: 0.5,
  ease: "easeInOut",
  repeat: 1,
};

const Cpu_Y_VARIANTS: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleY: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
  },
};

const Cpu_X_VARIANTS: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleX: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
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

const AnimatedCpu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Cpu</title>
<rect height="16" rx="2" width="16" x="4" y="4" />
          <rect height="6" rx="1" width="6" x="9" y="9" />
          <motion.path
            animate={controls}
            d="M15 2v2"
            transition={Cpu_TRANSITION}
            variants={Cpu_Y_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M15 20v2"
            transition={Cpu_TRANSITION}
            variants={Cpu_Y_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M2 15h2"
            transition={Cpu_TRANSITION}
            variants={Cpu_X_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M2 9h2"
            transition={Cpu_TRANSITION}
            variants={Cpu_X_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M20 15h2"
            transition={Cpu_TRANSITION}
            variants={Cpu_X_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M20 9h2"
            transition={Cpu_TRANSITION}
            variants={Cpu_X_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M9 2v2"
            transition={Cpu_TRANSITION}
            variants={Cpu_Y_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M9 20v2"
            transition={Cpu_TRANSITION}
            variants={Cpu_Y_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

AnimatedCpu.displayName = "AnimatedCpu";

export default AnimatedCpu;
