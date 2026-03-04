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

const AnimatedMusic = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Music</title>
          {/* Left note */}
          <motion.path
            d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, -10, 10, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "6px 17px" }}
          />
          {/* Right note */}
          <motion.path
            d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 10, -10, 5, 0],
                transition: { duration: 0.5, ease: "easeInOut", delay: 0.05 },
              },
            }}
            style={{ transformOrigin: "16px 17px" }}
          />
          {/* Staff */}
          <motion.path
            d="M9 17v-13h10v13"
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
            d="M9 8h10"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedMusic.displayName = "AnimatedMusic";

export default AnimatedMusic;
