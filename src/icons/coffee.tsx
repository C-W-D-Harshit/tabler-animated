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

const AnimatedCoffee = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Coffee</title>
          <motion.path
            d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          {/* Steam line 1 */}
          <motion.path
            d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                y: [2, -1, 0, 0],
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          />
          {/* Steam line 2 */}
          <motion.path
            d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                y: [2, -1, 0, 0],
                transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
              },
            }}
          />
          <motion.path
            d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, 0],
                transition: { duration: 0.1 },
              },
            }}
          />
          <motion.path
            d="M16.746 16.726a3 3 0 1 0 .252 -5.555"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedCoffee.displayName = "AnimatedCoffee";

export default AnimatedCoffee;
