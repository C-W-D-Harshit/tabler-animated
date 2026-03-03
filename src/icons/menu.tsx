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

const AnimatedMenu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Menu</title>
          <motion.path
            d="M4 8l16 0"
            variants={{
              normal: { y: 0, scaleX: 1 },
              animate: { y: [0, -1, 0], scaleX: [1, 1.05, 1] },
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M4 16l16 0"
            variants={{
              normal: { y: 0, scaleX: 1 },
              animate: { y: [0, 1, 0], scaleX: [1, 0.95, 1] },
            }}
            style={{ transformOrigin: "center" }}
            animate={controls}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedMenu.displayName = "AnimatedMenu";

export default AnimatedMenu;
