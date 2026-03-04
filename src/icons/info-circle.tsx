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

const AnimatedInfoCircle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Info Circle</title>
          <motion.path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.06, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M12 9h.01"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1],
                transition: { duration: 0.2, delay: 0.15 },
              },
            }}
          />
          <motion.path
            d="M11 12h1v4h1"
            animate={controls}
            variants={{
              normal: { opacity: 1, pathLength: 1 },
              animate: {
                opacity: [0, 1],
                pathLength: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedInfoCircle.displayName = "AnimatedInfoCircle";

export default AnimatedInfoCircle;
