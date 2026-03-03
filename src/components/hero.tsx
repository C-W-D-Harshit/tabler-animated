"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import AnimatedBell from "@/icons/bell";
import type { AnimatedIconHandle } from "@/icons/home";
import AnimatedHome from "@/icons/home";
import AnimatedSettings from "@/icons/settings";

// ─── Floating Icon Configs ─────────────────────────────────────────────
interface FloatingIconConfig {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number[];
  driftY: number[];
  rotate: number[];
  opacity: number;
}

const floatingIcons: FloatingIconConfig[] = [
  {
    id: "home-1",
    x: "12%",
    y: "18%",
    size: 42,
    delay: 0,
    duration: 18,
    driftX: [0, 15, -8, 12, 0],
    driftY: [0, -20, 10, -15, 0],
    rotate: [0, 5, -3, 4, 0],
    opacity: 0.12,
  },
  {
    id: "settings-1",
    x: "78%",
    y: "22%",
    size: 56,
    delay: 2,
    duration: 22,
    driftX: [0, -20, 10, -15, 0],
    driftY: [0, 12, -18, 8, 0],
    rotate: [0, -8, 6, -4, 0],
    opacity: 0.09,
  },
  {
    id: "bell-1",
    x: "25%",
    y: "65%",
    size: 38,
    delay: 4,
    duration: 20,
    driftX: [0, 10, -15, 8, 0],
    driftY: [0, -12, 18, -10, 0],
    rotate: [0, 6, -4, 3, 0],
    opacity: 0.1,
  },
  {
    id: "home-2",
    x: "85%",
    y: "55%",
    size: 32,
    delay: 1,
    duration: 16,
    driftX: [0, -12, 8, -10, 0],
    driftY: [0, 15, -10, 12, 0],
    rotate: [0, -4, 7, -3, 0],
    opacity: 0.08,
  },
  {
    id: "settings-2",
    x: "50%",
    y: "78%",
    size: 28,
    delay: 3,
    duration: 24,
    driftX: [0, 18, -12, 14, 0],
    driftY: [0, -8, 14, -6, 0],
    rotate: [0, 10, -6, 8, 0],
    opacity: 0.07,
  },
  {
    id: "bell-2",
    x: "65%",
    y: "12%",
    size: 34,
    delay: 5,
    duration: 19,
    driftX: [0, -14, 10, -8, 0],
    driftY: [0, 10, -14, 12, 0],
    rotate: [0, -6, 4, -5, 0],
    opacity: 0.11,
  },
  {
    id: "home-3",
    x: "8%",
    y: "42%",
    size: 24,
    delay: 6,
    duration: 21,
    driftX: [0, 8, -10, 6, 0],
    driftY: [0, -14, 8, -10, 0],
    rotate: [0, 3, -5, 2, 0],
    opacity: 0.06,
  },
  {
    id: "settings-3",
    x: "92%",
    y: "38%",
    size: 20,
    delay: 7,
    duration: 17,
    driftX: [0, -10, 6, -8, 0],
    driftY: [0, 8, -12, 6, 0],
    rotate: [0, -3, 5, -2, 0],
    opacity: 0.065,
  },
];

// ─── Inline SVG Icon Paths (for floating background particles) ─────────

function HomeIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
}

function BellIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
}

function SettingsIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function getIconForId(id: string, size: number) {
  const color = "var(--hero-floating-icon-color)";
  if (id.startsWith("home")) return <HomeIcon size={size} color={color} />;
  if (id.startsWith("bell")) return <BellIcon size={size} color={color} />;
  return <SettingsIcon size={size} color={color} />;
}

// ─── Floating Icon Component ───────────────────────────────────────────

function FloatingIcon({ config }: { config: FloatingIconConfig }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: config.x,
        top: config.y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: config.opacity,
        scale: 1,
        x: config.driftX,
        y: config.driftY,
        rotate: config.rotate,
      }}
      transition={{
        opacity: { duration: 2, delay: config.delay * 0.3 },
        scale: { duration: 2, delay: config.delay * 0.3 },
        x: {
          duration: config.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
        y: {
          duration: config.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
        rotate: {
          duration: config.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
    >
      {getIconForId(config.id, config.size)}
    </motion.div>
  );
}

// ─── Animated showcase icons (the three in the center) ─────────────────

const iconComponents = {
  home: AnimatedHome,
  bell: AnimatedBell,
  settings: AnimatedSettings,
} as const;

function ShowcaseIcon({
  icon,
  index,
}: {
  icon: "home" | "bell" | "settings";
  index: number;
}) {
  const ref = useRef<AnimatedIconHandle>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        ref.current?.startAnimation();
        intervalRef.current = setInterval(
          () => {
            ref.current?.startAnimation();
            setTimeout(() => ref.current?.stopAnimation(), 600);
          },
          3000 + index * 500,
        );
      },
      1500 + index * 400,
    );

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index]);

  const Component = iconComponents[icon];

  return (
    <motion.div
      className="hero-showcase-icon"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 1.2 + index * 0.15,
        ease: [0.21, 1.02, 0.73, 1],
      }}
    >
      <div className="hero-icon-glow" />
      <Component ref={ref} size={28} color="var(--hero-showcase-icon-color)" />
    </motion.div>
  );
}

// ─── Scroll Indicator ──────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-black/25 dark:text-white/30">
        Explore icons
      </span>
      <motion.div
        className="w-[1px] h-8 bg-gradient-to-b from-black/20 to-transparent dark:from-white/30"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}

// ─── Hero Component ────────────────────────────────────────────────────

export function Hero() {
  return (
    <div className="h-dvh w-full relative overflow-hidden">
      {/* Background — light & dark */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Noise texture overlay */}
      <div className="hero-noise" />

      {/* Subtle grid lines */}
      <div className="hero-grid" />

      {/* Floating ambient icons */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {floatingIcons.map((config) => (
          <FloatingIcon key={config.id} config={config} />
        ))}
      </div>

      {/* Center glow — light */}
      <div
        className="absolute z-[1] pointer-events-none dark:hidden"
        style={{
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
        }}
      />
      {/* Center glow — dark */}
      <div
        className="absolute z-[1] pointer-events-none hidden dark:block"
        style={{
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(60, 80, 180, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.21, 1.02, 0.73, 1],
          }}
        >
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Hand-crafted SVG animations</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.5,
            ease: [0.21, 1.02, 0.73, 1],
          }}
        >
          <span className="hero-headline-top">Icons that</span>
          <span className="hero-headline-bottom">breathe life</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.75,
            ease: [0.21, 1.02, 0.73, 1],
          }}
        >
          Beautifully animated Tabler icons, meticulously crafted
          <br className="hidden sm:block" />
          one batch at a time. Drop-in replacements for your UI.
        </motion.p>

        {/* Showcase icons */}
        <motion.div
          className="flex items-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {(["home", "bell", "settings"] as const).map((icon, i) => (
            <ShowcaseIcon key={icon} icon={icon} index={i} />
          ))}
        </motion.div>

        {/* CTA area */}
        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.5,
            ease: [0.21, 1.02, 0.73, 1],
          }}
        >
          <button
            type="button"
            onClick={() => {
              document
                .getElementById("icon-grid")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta-primary"
          >
            Browse icons
          </button>
          <a
            href="https://github.com/harshit/tabler-animated"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-secondary"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </motion.div>

        {/* Stats line */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>5,000+ icons</span>
          <span className="hero-stats-dot" />
          <span>MIT License</span>
          <span className="hero-stats-dot" />
          <span>React & SVG</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[3] bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
