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

const AnimatedUser = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={startAnimation}
        onMouseLeave={stopAnimation}
        role="button"
        tabIndex={0}
        {...props}
      >
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
          <title>User</title>
          <motion.path
            d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
            variants={{
              normal: { pathLength: 1, opacity: 1, scale: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                scale: [0.8, 1],
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
            style={{ transformOrigin: "12px 7px" }}
            initial="normal"
            animate={controls}
          />
          <motion.path
            d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
              },
            }}
            initial="normal"
            animate={controls}
          />
        </svg>
      </div>
    );
  },
);

AnimatedUser.displayName = "AnimatedUser";

export default AnimatedUser;
