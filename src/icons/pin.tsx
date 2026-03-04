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

const AnimatedPin = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Pin</title>
          <motion.path
            d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4"
            animate={controls}
            variants={{
              normal: { rotate: 0, y: 0 },
              animate: {
                rotate: [0, -5, 0],
                y: [0, 2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 10px" }}
          />
          <motion.path
            d="M9 15l-4.5 4.5"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0.5, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
          />
          <motion.path
            d="M14.5 4l5.5 5.5"
            animate={controls}
            variants={{
              normal: { rotate: 0, y: 0 },
              animate: {
                rotate: [0, -5, 0],
                y: [0, 2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 10px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedPin.displayName = "AnimatedPin";

export default AnimatedPin;
