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

const AnimatedLoader = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Loader</title>
          <motion.g
            animate={controls}
            variants={{
              normal: { rotate: 0 },
              animate: {
                rotate: [0, 360],
                transition: { duration: 0.7, ease: "linear" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M12 6l0 -3"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [1, 0.3, 1],
                  transition: { duration: 0.7, delay: 0 },
                },
              }}
            />
            <motion.path
              d="M16.25 7.75l2.15 -2.15"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.9, 0.3, 0.9],
                  transition: { duration: 0.7, delay: 0.08 },
                },
              }}
            />
            <motion.path
              d="M18 12l3 0"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.8, 0.3, 0.8],
                  transition: { duration: 0.7, delay: 0.16 },
                },
              }}
            />
            <motion.path
              d="M16.25 16.25l2.15 2.15"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.7, 0.3, 0.7],
                  transition: { duration: 0.7, delay: 0.24 },
                },
              }}
            />
            <motion.path
              d="M12 18l0 3"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.6, 0.3, 0.6],
                  transition: { duration: 0.7, delay: 0.32 },
                },
              }}
            />
            <motion.path
              d="M7.75 16.25l-2.15 2.15"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.5, 0.3, 0.5],
                  transition: { duration: 0.7, delay: 0.4 },
                },
              }}
            />
            <motion.path
              d="M6 12l-3 0"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.4, 0.3, 0.4],
                  transition: { duration: 0.7, delay: 0.48 },
                },
              }}
            />
            <motion.path
              d="M7.75 7.75l-2.15 -2.15"
              animate={controls}
              variants={{
                normal: { opacity: 1 },
                animate: {
                  opacity: [0.3, 0.3, 0.3],
                  transition: { duration: 0.7, delay: 0.56 },
                },
              }}
            />
          </motion.g>
        </svg>
      </div>
    );
  },
);

AnimatedLoader.displayName = "AnimatedLoader";

export default AnimatedLoader;
