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

const AnimatedArchive = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Archive</title>
          <motion.path
            d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, -2, 0],
                transition: { duration: 0.3, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [1, 0.95, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 20px" }}
          />
          <motion.path
            d="M10 12l4 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1],
                y: [-4, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedArchive.displayName = "AnimatedArchive";

export default AnimatedArchive;
