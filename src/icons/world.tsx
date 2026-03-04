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

const AnimatedWorld = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>World</title>
          {/* Globe circle */}
          <motion.path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 360],
                transition: { duration: 0.8, ease: "linear" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Latitude line top */}
          <motion.path
            d="M3.6 9h16.8"
            animate={controls}
            variants={{
              normal: { opacity: 1, scaleX: 1 },
              animate: {
                opacity: [1, 0.4, 1],
                scaleX: [1, 0.9, 1],
                transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 9px" }}
          />
          {/* Latitude line bottom */}
          <motion.path
            d="M3.6 15h16.8"
            animate={controls}
            variants={{
              normal: { opacity: 1, scaleX: 1 },
              animate: {
                opacity: [1, 0.4, 1],
                scaleX: [1, 0.9, 1],
                transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "12px 15px" }}
          />
          {/* Longitude left */}
          <motion.path
            d="M11.5 3a17 17 0 0 0 0 18"
            animate={controls}
            variants={{
              normal: { x: 0 },
              animate: {
                x: [0, -1.5, 1.5, 0],
                transition: { duration: 0.7, ease: "easeInOut" },
              },
            }}
          />
          {/* Longitude right */}
          <motion.path
            d="M12.5 3a17 17 0 0 1 0 18"
            animate={controls}
            variants={{
              normal: { x: 0 },
              animate: {
                x: [0, 1.5, -1.5, 0],
                transition: { duration: 0.7, ease: "easeInOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedWorld.displayName = "AnimatedWorld";

export default AnimatedWorld;
