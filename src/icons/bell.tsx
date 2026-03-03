"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

const bellVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 15, -15, 10, -10, 5, -5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const clapperVariants: Variants = {
  normal: { d: "M9 17v1a3 3 0 0 0 6 0v-1" },
  animate: {
    d: [
      "M9 17v1a3 3 0 0 0 6 0v-1",
      "M8.5 17v1a3.5 3.5 0 0 0 7 0v-1",
      "M9 17v1a3 3 0 0 0 6 0v-1",
    ],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const AnimatedBell = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, strokeWidth = 2, color = "currentColor", ...props }, ref) => {
    const controls = useAnimation();
    const isAnimatingRef = useRef(false);

    const startAnimation = useCallback(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      controls.start("animate");
    }, [controls]);

    const stopAnimation = useCallback(() => {
      isAnimatingRef.current = false;
      controls.start("normal");
    }, [controls]);

    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }));

    return (
      <div {...props}>
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
          <title>Bell</title>
          <motion.g
            variants={bellVariants}
            animate={controls}
            style={{ transformOrigin: "12px 4px" }}
          >
            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          </motion.g>
          <motion.path variants={clapperVariants} animate={controls} />
        </svg>
      </div>
    );
  },
);

AnimatedBell.displayName = "AnimatedBell";

export default AnimatedBell;
