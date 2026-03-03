// Barrel export for all hand-crafted animated icon components.
// Update this file when adding new animated icons.

export { default as AnimatedBell } from "./bell";
// Re-export the handle type for consumers
export type { AnimatedIconHandle, AnimatedIconProps } from "./home";
export { default as AnimatedHome } from "./home";
export { default as AnimatedSettings } from "./settings";

// Map of icon name -> lazy-loaded animated component
// Used by IconCard to dynamically render the correct animated version
import type { ComponentType } from "react";
import { lazy } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./home";

type AnimatedComponent = ComponentType<
  AnimatedIconProps & { ref?: React.Ref<AnimatedIconHandle> }
>;

export const animatedComponentMap: Record<string, AnimatedComponent> = {
  home: lazy(() => import("./home")),
  bell: lazy(() => import("./bell")),
  settings: lazy(() => import("./settings")),
};
