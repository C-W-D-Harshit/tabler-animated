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

const AnimatedWand = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Wand</title>
          {/* Wand body */}
          <motion.path
            d="M6 21l15 -15l-3 -3l-15 15l3 3"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, -6, 6, -3, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Wand grip line */}
          <motion.path
            d="M15 6l3 3"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, -6, 6, -3, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Sparkle top-left */}
          <motion.path
            d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [1, 1.4, 0.8, 1.2, 1],
                opacity: [1, 0.5, 1, 0.7, 1],
                transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "9px 5px" }}
          />
          {/* Sparkle bottom-right */}
          <motion.path
            d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [1, 1.4, 0.8, 1.2, 1],
                opacity: [1, 0.5, 1, 0.7, 1],
                transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "19px 15px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedWand.displayName = "AnimatedWand";

export default AnimatedWand;
