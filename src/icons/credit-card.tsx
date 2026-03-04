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

const AnimatedCreditCard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Credit Card</title>
          <motion.path
            d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8"
            animate={controls}
            variants={{
              normal: { rotateY: 0 },
              animate: {
                rotateY: [0, 15, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M3 10l18 0"
            animate={controls}
            variants={{
              normal: { rotateY: 0 },
              animate: {
                rotateY: [0, 15, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M7 15l.01 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, rotateY: 0 },
              animate: {
                opacity: [0, 1],
                rotateY: [0, 15, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <motion.path
            d="M11 15l2 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, rotateY: 0 },
              animate: {
                opacity: [0, 1],
                rotateY: [0, 15, -5, 0],
                transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedCreditCard.displayName = "AnimatedCreditCard";

export default AnimatedCreditCard;
