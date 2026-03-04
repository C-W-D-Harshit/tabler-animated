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

const AnimatedTerminal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Terminal</title>
          <motion.path
            d="M5 7l5 5l-5 5"
            animate={controls}
            variants={{
              normal: { translateX: 0 },
              animate: {
                translateX: [0, 2, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M12 19l7 0"
            animate={controls}
            variants={{
              normal: { scaleX: 1, opacity: 1 },
              animate: {
                scaleX: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.35, ease: "easeOut", delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "12px 19px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedTerminal.displayName = "AnimatedTerminal";

export default AnimatedTerminal;
