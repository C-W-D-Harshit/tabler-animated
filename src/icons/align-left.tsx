"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const AlignLeft_DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.3,
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

const AnimatedAlignLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>AlignLeft</title>
<motion.line
            animate={controls}
            transition={AlignLeft_DEFAULT_TRANSITION}
            variants={{
              normal: { x2: 21 },
              animate: { x2: 21 },
            }}
            x1="3"
            x2="21"
            y1="6"
            y2="6"
          />

          <motion.line
            animate={controls}
            transition={AlignLeft_DEFAULT_TRANSITION}
            variants={{
              normal: { x2: 15 },
              animate: { x2: 19 },
            }}
            x1="3"
            x2="15"
            y1="12"
            y2="12"
          />

          <motion.line
            animate={controls}
            transition={AlignLeft_DEFAULT_TRANSITION}
            variants={{
              normal: { x2: 17 },
              animate: { x2: 12 },
            }}
            x1="3"
            x2="17"
            y1="18"
            y2="18"
          />
        </svg>
      </div>
    );
  },
);

AnimatedAlignLeft.displayName = "AnimatedAlignLeft";

export default AnimatedAlignLeft;
