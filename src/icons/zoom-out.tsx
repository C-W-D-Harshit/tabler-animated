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

const AnimatedZoomOut = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Zoom Out</title>
          {/* Magnifying glass circle */}
          <motion.path
            d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
            animate={controls}
            variants={{
              normal: { scale: 1 },
              animate: {
                scale: [1, 0.88, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "10px 10px" }}
          />
          {/* Minus line */}
          <motion.path
            d="M7 10l6 0"
            animate={controls}
            variants={{
              normal: { scaleX: 1, opacity: 1 },
              animate: {
                scaleX: [1, 0.6, 1],
                opacity: [1, 0.5, 1],
                transition: { duration: 0.3, ease: "easeInOut", delay: 0.15 },
              },
            }}
            style={{ transformOrigin: "10px 10px" }}
          />
          {/* Handle */}
          <motion.path
            d="M21 21l-6 -6"
            animate={controls}
            variants={{
              normal: { x: 0, y: 0 },
              animate: {
                x: [0, -1, 0],
                y: [0, -1, 0],
                transition: { duration: 0.3, ease: "easeInOut", delay: 0.05 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedZoomOut.displayName = "AnimatedZoomOut";

export default AnimatedZoomOut;
