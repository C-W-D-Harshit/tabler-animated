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

const AnimatedLink = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Link</title>
          <motion.path
            d="M9 15l6 -6"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1],
                transition: { duration: 0.1 },
              },
            }}
          />
          {/* Top-right chain */}
          <motion.path
            d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"
            animate={controls}
            variants={{
              normal: { x: 0, y: 0 },
              animate: {
                x: [2, -1, 0],
                y: [-2, 1, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
          {/* Bottom-left chain */}
          <motion.path
            d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
            animate={controls}
            variants={{
              normal: { x: 0, y: 0 },
              animate: {
                x: [-2, 1, 0],
                y: [2, -1, 0],
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedLink.displayName = "AnimatedLink";

export default AnimatedLink;
