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

const AnimatedConfetti = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Confetti</title>
          {/* Sparkle particles - staggered fade in */}
          <motion.path
            d="M4 5h2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0 },
              },
            }}
            style={{ transformOrigin: "5px 5px" }}
          />
          <motion.path
            d="M5 4v2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0 },
              },
            }}
            style={{ transformOrigin: "5px 5px" }}
          />
          <motion.path
            d="M11.5 4l-.5 2"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1],
                y: [-3, 0],
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
          />
          <motion.path
            d="M18 5h2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "19px 5px" }}
          />
          <motion.path
            d="M19 4v2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "19px 5px" }}
          />
          <motion.path
            d="M15 9l-1 1"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
          />
          <motion.path
            d="M18 13l2 -.5"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1],
                transition: { duration: 0.3, delay: 0.25 },
              },
            }}
          />
          <motion.path
            d="M18 19h2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0.3 },
              },
            }}
            style={{ transformOrigin: "19px 19px" }}
          />
          <motion.path
            d="M19 18v2"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                scale: [0.5, 1.3, 1],
                transition: { duration: 0.4, delay: 0.3 },
              },
            }}
            style={{ transformOrigin: "19px 19px" }}
          />
          {/* Main confetti cone */}
          <motion.path
            d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, -3, 2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "7px 16px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedConfetti.displayName = "AnimatedConfetti";

export default AnimatedConfetti;
