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

const AnimatedBolt = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>Bolt</title>
          <motion.path
            d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
            animate={controls}
            variants={{
              normal: { opacity: 1, scale: 1 },
              animate: {
                opacity: [1, 0.5, 1, 0.7, 1],
                scale: [1, 1.1, 0.95, 1.05, 1],
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      </div>
    );
  },
);

AnimatedBolt.displayName = "AnimatedBolt";

export default AnimatedBolt;
