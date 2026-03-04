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

const AnimatedCpu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>CPU</title>
          {/* Outer chip */}
          <motion.path
            d="M5 6a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -12"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          {/* Inner core - pulses */}
          <motion.path
            d="M9 9h6v6h-6l0 -6"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [1, 0.4, 1],
                scale: [1, 0.92, 1],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Pins - staggered glow */}
          <motion.path
            d="M3 10h2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0 },
              },
            }}
          />
          <motion.path
            d="M3 14h2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.05 },
              },
            }}
          />
          <motion.path
            d="M10 3v2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.1 },
              },
            }}
          />
          <motion.path
            d="M14 3v2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.15 },
              },
            }}
          />
          <motion.path
            d="M21 10h-2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.2 },
              },
            }}
          />
          <motion.path
            d="M21 14h-2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.25 },
              },
            }}
          />
          <motion.path
            d="M14 21v-2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.3 },
              },
            }}
          />
          <motion.path
            d="M10 21v-2"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.3, 1, 0.3, 1],
                transition: { duration: 0.4, delay: 0.35 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedCpu.displayName = "AnimatedCpu";

export default AnimatedCpu;
