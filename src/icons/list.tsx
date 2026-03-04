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

const AnimatedList = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>List</title>
          {/* Lines - stagger in from left */}
          <motion.path
            d="M9 6l11 0"
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [-8, 0],
                opacity: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0 },
              },
            }}
          />
          <motion.path
            d="M9 12l11 0"
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [-8, 0],
                opacity: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
              },
            }}
          />
          <motion.path
            d="M9 18l11 0"
            animate={controls}
            variants={{
              normal: { x: 0, opacity: 1 },
              animate: {
                x: [-8, 0],
                opacity: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
          />
          {/* Bullets */}
          <motion.path
            d="M5 6l0 .01"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1],
                transition: { duration: 0.3, delay: 0 },
              },
            }}
            style={{ transformOrigin: "5px 6px" }}
          />
          <motion.path
            d="M5 12l0 .01"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1],
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "5px 12px" }}
          />
          <motion.path
            d="M5 18l0 .01"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "5px 18px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

export default AnimatedList;
