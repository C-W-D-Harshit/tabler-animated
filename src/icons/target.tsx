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

const AnimatedTarget = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Target</title>
          {/* Bullseye dot */}
          <motion.path
            d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [1, 1.8, 1],
                opacity: [1, 0.6, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.3 },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Inner ring */}
          <motion.path
            d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [1, 0.85, 1.05, 1],
                opacity: [1, 0.7, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Outer ring */}
          <motion.path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [1, 0.9, 1.03, 1],
                opacity: [1, 0.7, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedTarget.displayName = "AnimatedTarget";

export default AnimatedTarget;
