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

const AnimatedCode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Code</title>
          <motion.path
            d="M7 8l-4 4l4 4"
            animate={controls}
            variants={{
              normal: { translateX: 0 },
              animate: {
                translateX: [0, -2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M17 8l4 4l-4 4"
            animate={controls}
            variants={{
              normal: { translateX: 0 },
              animate: {
                translateX: [0, 2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          <path d="M14 4l-4 16" />
        </svg>
      </div>
    );
  },
);

AnimatedCode.displayName = "AnimatedCode";

export default AnimatedCode;
