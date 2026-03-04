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

const AnimatedTrophy = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Trophy</title>
          {/* Base */}
          <motion.path
            d="M8 21l8 0"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 0.5, 1],
                transition: { duration: 0.3, delay: 0.4 },
              },
            }}
          />
          {/* Stem */}
          <motion.path
            d="M12 17l0 4"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 0.5, 1],
                transition: { duration: 0.3, delay: 0.35 },
              },
            }}
          />
          {/* Top rim */}
          <path d="M7 4l10 0" />
          {/* Cup body */}
          <motion.path
            d="M17 4v8a5 5 0 0 1 -10 0v-8"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, -3, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          {/* Left handle */}
          <motion.path
            d="M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.2, 1],
                transition: { duration: 0.35, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "5px 9px" }}
          />
          {/* Right handle */}
          <motion.path
            d="M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.2, 1],
                transition: { duration: 0.35, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "19px 9px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedTrophy.displayName = "AnimatedTrophy";

export default AnimatedTrophy;
