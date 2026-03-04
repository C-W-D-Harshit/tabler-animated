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

const AnimatedVolume = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Volume</title>
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          <motion.path
            d="M15 8a5 5 0 0 1 0 8"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateX: 0 },
              animate: {
                opacity: [0, 1],
                translateX: [1, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0 },
              },
            }}
          />
          <motion.path
            d="M17.7 5a9 9 0 0 1 0 14"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateX: 0 },
              animate: {
                opacity: [0, 1],
                translateX: [1, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.15 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedVolume.displayName = "AnimatedVolume";

export default AnimatedVolume;
