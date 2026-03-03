"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Expand_DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
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

const AnimatedExpand = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Expand</title>
<motion.path
            animate={controls}
            d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"
            transition={Expand_DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M3 16.2V21m0 0h4.8M3 21l6-6"
            transition={Expand_DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M21 7.8V3m0 0h-4.8M21 3l-6 6"
            transition={Expand_DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "2px", translateY: "-2px" },
            }}
          />
          <motion.path
            animate={controls}
            d="M3 7.8V3m0 0h4.8M3 3l6 6"
            transition={Expand_DEFAULT_TRANSITION}
            variants={{
              normal: { translateX: "0%", translateY: "0%" },
              animate: { translateX: "-2px", translateY: "-2px" },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedExpand.displayName = "AnimatedExpand";

export default AnimatedExpand;
