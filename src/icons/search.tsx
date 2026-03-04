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

const AnimatedSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Search</title>
          <motion.circle
            cx="10"
            cy="10"
            r="7"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 0.85, 1.05, 1],
                transition: { duration: 0.45, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "10px 10px" }}
          />
          <motion.path
            d="M21 21l-6 -6"
            animate={controls}
            variants={{
              normal: { translateX: 0, translateY: 0 },
              animate: {
                translateX: [0, -1.5, 0.5, 0],
                translateY: [0, -1.5, 0.5, 0],
                transition: { duration: 0.45, ease: "easeInOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedSearch.displayName = "AnimatedSearch";

export default AnimatedSearch;
