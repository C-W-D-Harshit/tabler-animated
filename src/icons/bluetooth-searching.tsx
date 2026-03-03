"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const BluetoothSearching_PATH_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: {
      repeat: 0,
    },
  },
  animate: {
    scale: [0, 1, 0.8],
  },
};

const BluetoothSearching_SECOND_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.8, 1],
    transition: { repeat: Number.POSITIVE_INFINITY },
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

const AnimatedBluetoothSearching = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          <title>BluetoothSearching</title>
<motion.path
          animate={controls}
          d="m7 7 10 10-5 5V2l5 5L7 17"
          variants={BluetoothSearching_SECOND_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M20.83 14.83a4 4 0 0 0 0-5.66"
          transition={{
            duration: 0.6,
            delay: 0.2,
            repeat: Number.POSITIVE_INFINITY,
          }}
          variants={BluetoothSearching_PATH_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M18 12h.01"
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
          }}
          variants={BluetoothSearching_PATH_VARIANTS}
        />
        </svg>
      </div>
    );
  },
);

AnimatedBluetoothSearching.displayName = "AnimatedBluetoothSearching";

export default AnimatedBluetoothSearching;
