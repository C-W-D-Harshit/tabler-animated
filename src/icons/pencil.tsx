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

const AnimatedPencil = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Pencil</title>
          <motion.path
            d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"
            animate={controls}
            variants={{
              normal: { rotate: 0, x: 0, y: 0 },
              animate: {
                rotate: [0, -3, 0],
                x: [0, -1, 0],
                y: [0, 1, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M13.5 6.5l4 4"
            animate={controls}
            variants={{
              normal: { rotate: 0, x: 0, y: 0 },
              animate: {
                rotate: [0, -3, 0],
                x: [0, -1, 0],
                y: [0, 1, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedPencil.displayName = "AnimatedPencil";

export default AnimatedPencil;
