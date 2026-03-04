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

const AnimatedCurrencyDollar = forwardRef<
  AnimatedIconHandle,
  AnimatedIconProps
>(({ size = 24, strokeWidth = 2, color = "currentColor", ...props }, ref) => {
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
        <title>Currency Dollar</title>
        <motion.path
          d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"
          animate={controls}
          variants={{
            normal: { y: 0, opacity: 1 },
            animate: {
              y: [4, -2, 0],
              opacity: [0, 1, 1],
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
        />
        <motion.path
          d="M12 3v3m0 12v3"
          animate={controls}
          variants={{
            normal: { y: 0, opacity: 1 },
            animate: {
              y: [4, -2, 0],
              opacity: [0, 1, 1],
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
        />
      </svg>
    </div>
  );
});

AnimatedCurrencyDollar.displayName = "AnimatedCurrencyDollar";

export default AnimatedCurrencyDollar;
