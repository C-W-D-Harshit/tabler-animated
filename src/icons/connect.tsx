"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const Connect_PLUG_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -3,
    y: 3,
  },
};

const Connect_SOCKET_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 3,
    y: -3,
  },
};

const Connect_PATH_VARIANTS = {
  normal: (custom: { x: number; y: number }) => ({
    d: `M${custom.x} ${custom.y} l2.5 -2.5`,
  }),
  animate: (custom: { x: number; y: number }) => ({
    d: `M${custom.x + 2.93} ${custom.y - 2.93} l0.10 -0.10`,
  }),
};

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

const AnimatedConnect = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, strokeWidth = 2, color = "currentColor", onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
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
          <title>Connect</title>
<motion.path
            animate={controls}
            d="M19 5l3 -3"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={{
              normal: {
                d: "M19 5l3 -3",
              },
              animate: {
                d: "M17 7l5 -5",
              },
            }}
          />
          <motion.path
            animate={controls}
            d="m2 22 3-3"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={{
              normal: {
                d: "m2 22 3-3",
              },
              animate: {
                d: "m2 22 6-6",
              },
            }}
          />
          <motion.path
            animate={controls}
            d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={Connect_SOCKET_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: 7.5, y: 13.5 }}
            initial="normal"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={Connect_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={{ x: 10.5, y: 16.5 }}
            initial="normal"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={Connect_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            variants={Connect_PLUG_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

AnimatedConnect.displayName = "AnimatedConnect";

export default AnimatedConnect;
