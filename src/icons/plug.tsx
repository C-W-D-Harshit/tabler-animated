"use client";

import { motion, useAnimation } from "motion/react";
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

const AnimatedPlug = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Plug</title>
          <motion.path
            d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 10, -5, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M4 20l3.5 -3.5"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          <motion.path
            d="M15 4l-3.5 3.5"
            animate={controls}
            variants={{
              normal: { opacity: 1, pathLength: 1 },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
          />
          <motion.path
            d="M20 9l-3.5 3.5"
            animate={controls}
            variants={{
              normal: { opacity: 1, pathLength: 1 },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedPlug.displayName = "AnimatedPlug";

export default AnimatedPlug;
