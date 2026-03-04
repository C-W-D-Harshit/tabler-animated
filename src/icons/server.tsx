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

const AnimatedServer = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Server</title>
          {/* Top server */}
          <motion.path
            d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1],
                y: [-3, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0 },
              },
            }}
          />
          {/* Bottom server */}
          <motion.path
            d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2"
            animate={controls}
            variants={{
              normal: { opacity: 1, y: 0 },
              animate: {
                opacity: [0, 1],
                y: [3, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
              },
            }}
          />
          {/* Status LEDs blink */}
          <motion.path
            d="M7 8l0 .01"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
          />
          <motion.path
            d="M7 16l0 .01"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [0, 1, 0.5, 1],
                transition: { duration: 0.5, delay: 0.3 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedServer.displayName = "AnimatedServer";

export default AnimatedServer;
