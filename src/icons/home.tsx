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

const roofVariants: Variants = {
  normal: { d: "M5 12l-2 0l9 -9l9 9l-2 0" },
  animate: {
    d: [
      "M5 12l-2 0l9 -9l9 9l-2 0",
      "M5 14l-2 0l9 -11l9 11l-2 0",
      "M5 12l-2 0l9 -9l9 9l-2 0",
    ],
  },
};

const bodyVariants: Variants = {
  normal: { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" },
  animate: {
    d: [
      "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",
      "M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-5",
      "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",
    ],
  },
};

const doorVariants: Variants = {
  normal: { d: "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" },
  animate: {
    d: [
      "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",
      "M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4",
      "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",
    ],
  },
};

const AnimatedHome = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Home</title>
          <motion.path
            variants={roofVariants}
            animate={controls}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            variants={bodyVariants}
            animate={controls}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
          />
          <motion.path
            variants={doorVariants}
            animate={controls}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedHome.displayName = "AnimatedHome";

export default AnimatedHome;
