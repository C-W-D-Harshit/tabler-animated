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

const AnimatedLayout = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Layout</title>
          {/* Top-left panel */}
          <motion.path
            d="M4 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1],
                scale: [0.8, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0 },
              },
            }}
            style={{ transformOrigin: "7px 6px" }}
          />
          {/* Bottom-left panel */}
          <motion.path
            d="M4 15a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1],
                scale: [0.8, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "7px 16px" }}
          />
          {/* Right panel */}
          <motion.path
            d="M14 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -12"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [0, 1],
                scale: [0.8, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "17px 12px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedLayout.displayName = "AnimatedLayout";

export default AnimatedLayout;
