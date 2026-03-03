"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type * as React from "react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const CloudSun_CLOUD_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [-1, 1, -1, 1, 0],
    y: [-1, 1, -1, 1, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const CloudSun_SUN_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
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

const AnimatedCloudSun = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    {
      size = 24,
      strokeWidth = 2,
      color = "currentColor",
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
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
          <title>CloudSun</title>
          <motion.g
            animate={controls}
            initial="normal"
            variants={CloudSun_CLOUD_VARIANTS}
          >
            <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
          </motion.g>
          {[
            "M12 2v2",
            "m4.93 4.93 1.41 1.41",
            "M20 12h2",
            "m19.07 4.93-1.41 1.41",
            "M15.947 12.65a4 4 0 0 0-5.925-4.128",
          ].map((d, index) => (
            <motion.path
              animate={controls}
              custom={index + 1}
              d={d}
              initial="normal"
              key={d}
              variants={CloudSun_SUN_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  },
);

AnimatedCloudSun.displayName = "AnimatedCloudSun";

export default AnimatedCloudSun;
