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

const AnimatedSun = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Sun</title>
          <motion.g
            variants={{
              normal: { rotate: 0, scale: 1 },
              animate: {
                rotate: [0, 90],
                scale: [1, 1.1, 1],
                transition: { duration: 0.8, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
          >
            <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </motion.g>
        </svg>
      </div>
    );
  },
);

AnimatedSun.displayName = "AnimatedSun";

export default AnimatedSun;
