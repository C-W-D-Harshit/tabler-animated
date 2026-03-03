"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Accessibility_CIRCLE_VARIANTS: Variants = {
  initial: {
    y: 0,
    x: 0,
  },
  animate: {
    y: [0, 1, -1, 0],
    x: [0, 1, -1, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const Accessibility_PRIMARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const Accessibility_SECONDARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: -360,
    transition: {
      duration: 1,
      delay: 0.4,
      ease: "easeInOut",
    },
  },
};

const Accessibility_PATH_VARIANTS: Variants = {
  initial: {
    rotate: 0,
    d: "M8 5 L5 8",
  },
  animate: {
    rotate: [0, -60, 0],
    d: ["M8 5 L5 8", "M8 5 L4 9", "M8 5 L5 8"],
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: "easeInOut",
    },
    transformOrigin: "top right",
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

const AnimatedAccessibility = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Accessibility</title>
<motion.circle
          animate={controls}
          cx="16"
          cy="4"
          initial="initial"
          r="1"
          variants={Accessibility_CIRCLE_VARIANTS}
        />
        <motion.g
          animate={controls}
          initial="initial"
          variants={Accessibility_PRIMARY_GROUP_VARIANTS}
        >
          <path d="m18 19 1-7-6 1" />
          <path d="M8,5l5.5,3-2.4,3.5" />
          <motion.path
            animate={controls}
            d="M8 5 L5 8"
            initial="initial"
            variants={Accessibility_PATH_VARIANTS}
          />
        </motion.g>
        <motion.g
          animate={controls}
          initial="initial"
          variants={Accessibility_SECONDARY_GROUP_VARIANTS}
        >
          <path d="M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" />
          <path d="M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" />
          <path d="M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" />
        </motion.g>
        </svg>
      </div>
    );
  },
);

AnimatedAccessibility.displayName = "AnimatedAccessibility";

export default AnimatedAccessibility;
