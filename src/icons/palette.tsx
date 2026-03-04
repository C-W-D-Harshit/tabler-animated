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

const AnimatedPalette = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Palette</title>
          <motion.path
            d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          {/* Color dots pop */}
          <motion.path
            d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [0, 1.3, 1],
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "8.5px 10.5px" }}
          />
          <motion.path
            d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [0, 1.3, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "12.5px 7.5px" }}
          />
          <motion.path
            d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [0, 1.3, 1],
                transition: { duration: 0.3, delay: 0.3 },
              },
            }}
            style={{ transformOrigin: "16.5px 10.5px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedPalette.displayName = "AnimatedPalette";

export default AnimatedPalette;
