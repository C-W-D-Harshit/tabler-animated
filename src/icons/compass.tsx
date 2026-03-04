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

const AnimatedCompass = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Compass</title>
          {/* Needle - rotates to find north */}
          <motion.path
            d="M8 16l2 -6l6 -2l-2 6l-6 2"
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 20, -15, 8, -3, 0],
                transition: { duration: 0.7, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          <path d="M12 3l0 2" />
          <path d="M12 19l0 2" />
          <path d="M3 12l2 0" />
          <path d="M19 12l2 0" />
        </svg>
      </div>
    );
  },
);

AnimatedCompass.displayName = "AnimatedCompass";

export default AnimatedCompass;
