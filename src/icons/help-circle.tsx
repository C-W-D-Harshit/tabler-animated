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

const AnimatedHelpCircle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Help Circle</title>
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
            d="M12 16v.01"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1],
                transition: { duration: 0.2, delay: 0.3 },
              },
            }}
          />
          <motion.path
            d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"
            animate={controls}
            variants={{
              normal: { opacity: 1, rotate: 0 },
              animate: {
                opacity: [0, 1],
                rotate: [10, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "12px 11px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedHelpCircle.displayName = "AnimatedHelpCircle";

export default AnimatedHelpCircle;
