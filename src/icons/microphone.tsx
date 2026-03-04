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

const AnimatedMicrophone = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Microphone</title>
          {/* Mic body */}
          <motion.path
            d="M9 5a3 3 0 0 1 3 -3a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3l0 -5"
            animate={controls}
            variants={{
              normal: { scaleY: 1 },
              animate: {
                scaleY: [1, 1.05, 0.97, 1.02, 1],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 7px" }}
          />
          {/* Sound wave arc */}
          <motion.path
            d="M5 10a7 7 0 0 0 14 0"
            animate={controls}
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [0.95, 1.05, 1],
                opacity: [0.5, 1, 1],
                transition: { duration: 0.4, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 10px" }}
          />
          <path d="M8 21l8 0" />
          <path d="M12 17l0 4" />
        </svg>
      </div>
    );
  },
);

AnimatedMicrophone.displayName = "AnimatedMicrophone";

export default AnimatedMicrophone;
