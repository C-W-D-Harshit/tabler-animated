"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const BluetoothConnected_PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1, 0.5, 1],
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
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

const AnimatedBluetoothConnected = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>BluetoothConnected</title>
<motion.path
          animate={controls}
          d="m7 7 10 10-5 5V2l5 5L7 17"
          variants={BluetoothConnected_PATH_VARIANTS}
        />
        <motion.line
          animate={controls}
          variants={{
            normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
              pathOffset: [1, 0],
              transition: {
                duration: 0.4,
              },
            },
          }}
          x1="18"
          x2="21"
          y1="12"
          y2="12"
        />
        <motion.line
          animate={controls}
          variants={{
            normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
              pathOffset: [-1, 0],
              transition: {
                duration: 0.2,
              },
            },
          }}
          x1="3"
          x2="6"
          y1="12"
          y2="12"
        />
        </svg>
      </div>
    );
  },
);

AnimatedBluetoothConnected.displayName = "AnimatedBluetoothConnected";

export default AnimatedBluetoothConnected;
