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

const AnimatedWifi = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Wifi</title>
          <path d="M12 18l.01 0" />
          <motion.path
            d="M9.172 15.172a4 4 0 0 1 5.656 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateY: 0 },
              animate: {
                opacity: [0, 1],
                translateY: [2, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0 },
              },
            }}
          />
          <motion.path
            d="M6.343 12.343a8 8 0 0 1 11.314 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateY: 0 },
              animate: {
                opacity: [0, 1],
                translateY: [2, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.12 },
              },
            }}
          />
          <motion.path
            d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"
            animate={controls}
            variants={{
              normal: { opacity: 1, translateY: 0 },
              animate: {
                opacity: [0, 1],
                translateY: [2, 0],
                transition: { duration: 0.3, ease: "easeOut", delay: 0.24 },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedWifi.displayName = "AnimatedWifi";

export default AnimatedWifi;
