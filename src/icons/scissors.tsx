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

const AnimatedScissors = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Scissors</title>
          {/* Top ring */}
          <motion.path
            d="M3 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          {/* Bottom ring */}
          <motion.path
            d="M3 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          {/* Top blade - snip */}
          <motion.path
            d="M8.6 8.6l10.4 10.4"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 5, -3, 5, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "8.6px 8.6px" }}
          />
          {/* Bottom blade - snip */}
          <motion.path
            d="M8.6 15.4l10.4 -10.4"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, -5, 3, -5, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "8.6px 15.4px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedScissors.displayName = "AnimatedScissors";

export default AnimatedScissors;
