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

const AnimatedUsers = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Users</title>
          {/* Primary user head */}
          <motion.path
            d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, -2, 0],
                transition: { duration: 0.35, ease: "easeInOut" },
              },
            }}
          />
          {/* Primary user body */}
          <motion.path
            d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, -2, 0],
                transition: { duration: 0.35, ease: "easeInOut" },
              },
            }}
          />
          {/* Secondary user head */}
          <motion.path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [0, 2, 0],
                opacity: [1, 0.7, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.15 },
              },
            }}
          />
          {/* Secondary user body */}
          <motion.path
            d="M21 21v-2a4 4 0 0 0 -3 -3.85"
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [0, 2, 0],
                opacity: [1, 0.7, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.15 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedUsers.displayName = "AnimatedUsers";

export default AnimatedUsers;
