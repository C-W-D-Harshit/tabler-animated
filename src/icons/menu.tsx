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
          <title>Menu</title>
          {/* Top line */}
          <motion.path
            d="M4 8l16 0"
            animate={controls}
            variants={{
              normal: { x: 0 },
              animate: {
                x: [-4, 2, 0],
                transition: { duration: 0.3, ease: "easeOut" },
              },
            }}
          />
          {/* Bottom line */}
          <motion.path
            d="M4 16l16 0"
            animate={controls}
            variants={{
              normal: { x: 0 },
              animate: {
                x: [4, -2, 0],
                transition: { duration: 0.3, ease: "easeOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedMenu.displayName = "AnimatedMenu";

export default AnimatedMenu;
