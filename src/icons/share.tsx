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

const AnimatedShare = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Share</title>
          {/* Left node */}
          <motion.path
            d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.15, 1],
                transition: { duration: 0.3, delay: 0 },
              },
            }}
            style={{ transformOrigin: "6px 12px" }}
          />
          {/* Top-right node */}
          <motion.path
            d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.15, 1],
                transition: { duration: 0.3, delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "18px 6px" }}
          />
          {/* Bottom-right node */}
          <motion.path
            d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.15, 1],
                transition: { duration: 0.3, delay: 0.3 },
              },
            }}
            style={{ transformOrigin: "18px 18px" }}
          />
          {/* Connecting lines */}
          <motion.path
            d="M8.7 10.7l6.6 -3.4"
            animate={controls}
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.2, delay: 0.05 },
              },
            }}
          />
          <motion.path
            d="M8.7 13.3l6.6 3.4"
            animate={controls}
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.2, delay: 0.15 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedShare.displayName = "AnimatedShare";

export default AnimatedShare;
