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

const AnimatedAnchor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Anchor</title>
          <motion.path
            d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, 2, -1, 1, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M9 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            animate={controls}
            variants={{
              normal: { y: 0 },
              animate: {
                y: [0, 2, -1, 1, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedAnchor.displayName = "AnimatedAnchor";

export default AnimatedAnchor;
