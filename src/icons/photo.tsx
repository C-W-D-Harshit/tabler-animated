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

const AnimatedPhoto = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Photo</title>
          <motion.path
            d="M15 8h.01"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [0, 1.4, 1],
                transition: { duration: 0.3, delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "15px 8px" }}
          />
          <motion.path
            d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [0.95, 1.02, 1],
                transition: { duration: 0.3, ease: "easeOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"
            animate={controls}
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.4, ease: "easeOut", delay: 0.15 },
              },
            }}
          />
          <motion.path
            d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"
            animate={controls}
            variants={{
              normal: { pathLength: 1, opacity: 1 },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.3 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedPhoto.displayName = "AnimatedPhoto";

export default AnimatedPhoto;
