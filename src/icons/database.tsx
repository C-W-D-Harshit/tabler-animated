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

const AnimatedDatabase = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Database</title>
          <motion.path
            d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"
            animate={controls}
            variants={{
              normal: { scaleX: 1 },
              animate: {
                scaleX: [1, 1.05, 0.97, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 6px" }}
          />
          <motion.path
            d="M4 6v6a8 3 0 0 0 16 0v-6"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [1, 1.03, 0.98, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.05 },
              },
            }}
            style={{ transformOrigin: "12px 9px" }}
          />
          <motion.path
            d="M4 12v6a8 3 0 0 0 16 0v-6"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [1, 1.03, 0.98, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 15px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedDatabase.displayName = "AnimatedDatabase";

export default AnimatedDatabase;
