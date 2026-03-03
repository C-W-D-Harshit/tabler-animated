"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const AlignVertical_DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
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

const AnimatedAlignVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>AlignVertical</title>
<motion.rect
          animate={controls}
          height="6"
          rx="2"
          transition={AlignVertical_DEFAULT_TRANSITION}
          variants={{
            normal: { scaleY: 1 },
            animate: { scaleY: 0.8 },
          }}
          width="10"
          x="7"
          y="9"
        />
        <motion.path
          animate={controls}
          d="M22 20H2"
          transition={AlignVertical_DEFAULT_TRANSITION}
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: -2,
              scaleX: 0.9,
            },
          }}
        />
        <motion.path
          animate={controls}
          d="M22 4H2"
          transition={AlignVertical_DEFAULT_TRANSITION}
          variants={{
            normal: { translateY: 0, scaleX: 1 },
            animate: {
              translateY: 2,
              scaleX: 0.9,
            },
          }}
        />
        </svg>
      </div>
    );
  },
);

AnimatedAlignVertical.displayName = "AnimatedAlignVertical";

export default AnimatedAlignVertical;
