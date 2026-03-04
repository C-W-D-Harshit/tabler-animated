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

const AnimatedGlobe = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Globe</title>
          {/* Globe head */}
          <motion.path
            d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 10, -10, 5, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "11px 9px" }}
          />
          {/* Arc */}
          <motion.path
            d="M5.75 15a8.015 8.015 0 1 0 9.25 -13"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 10, -10, 5, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "11px 12px" }}
          />
          {/* Stand */}
          <path d="M11 17v4" />
          <path d="M7 21h8" />
        </svg>
      </div>
    );
  },
);

AnimatedGlobe.displayName = "AnimatedGlobe";

export default AnimatedGlobe;
