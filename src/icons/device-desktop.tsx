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

const AnimatedDeviceDesktop = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Device Desktop</title>
          {/* Monitor */}
          <motion.path
            d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1.04, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 10px" }}
          />
          <motion.path
            d="M7 20h10"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          <motion.path
            d="M9 16v4"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "9px 16px" }}
          />
          <motion.path
            d="M15 16v4"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [0, 1],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
              },
            }}
            style={{ transformOrigin: "15px 16px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedDeviceDesktop.displayName = "AnimatedDeviceDesktop";

export default AnimatedDeviceDesktop;
