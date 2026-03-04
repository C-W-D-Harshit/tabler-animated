// Barrel export for all hand-crafted animated icon components.
// Update this file when adding new animated icons.

export { default as AnimatedActivity } from "./activity";
export { default as AnimatedAlarm } from "./alarm";
export { default as AnimatedAlertTriangle } from "./alert-triangle";
export { default as AnimatedAnchor } from "./anchor";
export { default as AnimatedArchive } from "./archive";
export { default as AnimatedArrowDown } from "./arrow-down";
export { default as AnimatedArrowLeft } from "./arrow-left";
export { default as AnimatedArrowRight } from "./arrow-right";
export { default as AnimatedArrowUp } from "./arrow-up";
export { default as AnimatedBell } from "./bell";
export { default as AnimatedBolt } from "./bolt";
export { default as AnimatedBookmark } from "./bookmark";
export { default as AnimatedCalendar } from "./calendar";
export { default as AnimatedCamera } from "./camera";
export { default as AnimatedChartBar } from "./chart-bar";
export { default as AnimatedChartLine } from "./chart-line";
export { default as AnimatedCheck } from "./check";
export { default as AnimatedCircleCheck } from "./circle-check";
export { default as AnimatedClipboard } from "./clipboard";
export { default as AnimatedClock } from "./clock";
export { default as AnimatedCloud } from "./cloud";
export { default as AnimatedCode } from "./code";
export { default as AnimatedCoffee } from "./coffee";
export { default as AnimatedCompass } from "./compass";
export { default as AnimatedConfetti } from "./confetti";
export { default as AnimatedCopy } from "./copy";
export { default as AnimatedCpu } from "./cpu";
export { default as AnimatedCreditCard } from "./credit-card";
export { default as AnimatedCrown } from "./crown";
export { default as AnimatedCurrencyDollar } from "./currency-dollar";
export { default as AnimatedDatabase } from "./database";
export { default as AnimatedDeviceDesktop } from "./device-desktop";
export { default as AnimatedDeviceMobile } from "./device-mobile";
export { default as AnimatedDownload } from "./download";
export { default as AnimatedEdit } from "./edit";
export { default as AnimatedEye } from "./eye";
export { default as AnimatedFile } from "./file";
export { default as AnimatedFlag } from "./flag";
export { default as AnimatedFlame } from "./flame";
export { default as AnimatedFolder } from "./folder";
export { default as AnimatedGift } from "./gift";
export { default as AnimatedGlobe } from "./globe";
export { default as AnimatedHeart } from "./heart";
export { default as AnimatedHelpCircle } from "./help-circle";
// Re-export the handle type for consumers
export type { AnimatedIconHandle, AnimatedIconProps } from "./home";
export { default as AnimatedHome } from "./home";
export { default as AnimatedInbox } from "./inbox";
export { default as AnimatedInfoCircle } from "./info-circle";
export { default as AnimatedKey } from "./key";
export { default as AnimatedLayout } from "./layout";
export { default as AnimatedLink } from "./link";
export { default as AnimatedList } from "./list";
export { default as AnimatedLoader } from "./loader";
export { default as AnimatedLock } from "./lock";
export { default as AnimatedLogout } from "./logout";
export { default as AnimatedMail } from "./mail";
export { default as AnimatedMapPin } from "./map-pin";
export { default as AnimatedMenu } from "./menu";
export { default as AnimatedMessage } from "./message";
export { default as AnimatedMicrophone } from "./microphone";
export { default as AnimatedMinus } from "./minus";
export { default as AnimatedMoon } from "./moon";
export { default as AnimatedMusic } from "./music";
export { default as AnimatedPalette } from "./palette";
export { default as AnimatedPencil } from "./pencil";
export { default as AnimatedPhone } from "./phone";
export { default as AnimatedPhoto } from "./photo";
export { default as AnimatedPin } from "./pin";
export { default as AnimatedPlug } from "./plug";
export { default as AnimatedPlus } from "./plus";
export { default as AnimatedPower } from "./power";
export { default as AnimatedPrinter } from "./printer";
export { default as AnimatedPuzzle } from "./puzzle";
export { default as AnimatedRefresh } from "./refresh";
export { default as AnimatedRocket } from "./rocket";
export { default as AnimatedScissors } from "./scissors";
export { default as AnimatedSearch } from "./search";
export { default as AnimatedSend } from "./send";
export { default as AnimatedServer } from "./server";
export { default as AnimatedSettings } from "./settings";
export { default as AnimatedShare } from "./share";
export { default as AnimatedShield } from "./shield";
export { default as AnimatedSparkles } from "./sparkles";
export { default as AnimatedStar } from "./star";
export { default as AnimatedSun } from "./sun";
export { default as AnimatedTag } from "./tag";
export { default as AnimatedTarget } from "./target";
export { default as AnimatedTerminal } from "./terminal";
export { default as AnimatedTrash } from "./trash";
export { default as AnimatedTrophy } from "./trophy";
export { default as AnimatedUpload } from "./upload";
export { default as AnimatedUser } from "./user";
export { default as AnimatedUsers } from "./users";
export { default as AnimatedVideo } from "./video";
export { default as AnimatedVolume } from "./volume";
export { default as AnimatedWand } from "./wand";
export { default as AnimatedWifi } from "./wifi";
export { default as AnimatedWorld } from "./world";
export { default as AnimatedX } from "./x";
export { default as AnimatedZoomIn } from "./zoom-in";
export { default as AnimatedZoomOut } from "./zoom-out";

// Map of icon name -> lazy-loaded animated component
// Used by IconCard to dynamically render the correct animated version
import type { ComponentType } from "react";
import { lazy } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./home";

type AnimatedComponent = ComponentType<
  AnimatedIconProps & { ref?: React.Ref<AnimatedIconHandle> }
>;

export const animatedComponentMap: Record<string, AnimatedComponent> = {
  activity: lazy(() => import("./activity")),
  alarm: lazy(() => import("./alarm")),
  "alert-triangle": lazy(() => import("./alert-triangle")),
  anchor: lazy(() => import("./anchor")),
  archive: lazy(() => import("./archive")),
  "arrow-down": lazy(() => import("./arrow-down")),
  "arrow-left": lazy(() => import("./arrow-left")),
  "arrow-right": lazy(() => import("./arrow-right")),
  "arrow-up": lazy(() => import("./arrow-up")),
  bell: lazy(() => import("./bell")),
  bolt: lazy(() => import("./bolt")),
  bookmark: lazy(() => import("./bookmark")),
  calendar: lazy(() => import("./calendar")),
  camera: lazy(() => import("./camera")),
  "chart-bar": lazy(() => import("./chart-bar")),
  "chart-line": lazy(() => import("./chart-line")),
  check: lazy(() => import("./check")),
  "circle-check": lazy(() => import("./circle-check")),
  clipboard: lazy(() => import("./clipboard")),
  clock: lazy(() => import("./clock")),
  cloud: lazy(() => import("./cloud")),
  code: lazy(() => import("./code")),
  coffee: lazy(() => import("./coffee")),
  compass: lazy(() => import("./compass")),
  confetti: lazy(() => import("./confetti")),
  copy: lazy(() => import("./copy")),
  cpu: lazy(() => import("./cpu")),
  "credit-card": lazy(() => import("./credit-card")),
  crown: lazy(() => import("./crown")),
  "currency-dollar": lazy(() => import("./currency-dollar")),
  database: lazy(() => import("./database")),
  "device-desktop": lazy(() => import("./device-desktop")),
  "device-mobile": lazy(() => import("./device-mobile")),
  download: lazy(() => import("./download")),
  edit: lazy(() => import("./edit")),
  eye: lazy(() => import("./eye")),
  file: lazy(() => import("./file")),
  flag: lazy(() => import("./flag")),
  flame: lazy(() => import("./flame")),
  folder: lazy(() => import("./folder")),
  gift: lazy(() => import("./gift")),
  globe: lazy(() => import("./globe")),
  heart: lazy(() => import("./heart")),
  "help-circle": lazy(() => import("./help-circle")),
  home: lazy(() => import("./home")),
  inbox: lazy(() => import("./inbox")),
  "info-circle": lazy(() => import("./info-circle")),
  key: lazy(() => import("./key")),
  layout: lazy(() => import("./layout")),
  link: lazy(() => import("./link")),
  list: lazy(() => import("./list")),
  loader: lazy(() => import("./loader")),
  lock: lazy(() => import("./lock")),
  logout: lazy(() => import("./logout")),
  mail: lazy(() => import("./mail")),
  "map-pin": lazy(() => import("./map-pin")),
  menu: lazy(() => import("./menu")),
  message: lazy(() => import("./message")),
  microphone: lazy(() => import("./microphone")),
  minus: lazy(() => import("./minus")),
  moon: lazy(() => import("./moon")),
  music: lazy(() => import("./music")),
  palette: lazy(() => import("./palette")),
  pencil: lazy(() => import("./pencil")),
  phone: lazy(() => import("./phone")),
  photo: lazy(() => import("./photo")),
  pin: lazy(() => import("./pin")),
  plug: lazy(() => import("./plug")),
  plus: lazy(() => import("./plus")),
  power: lazy(() => import("./power")),
  printer: lazy(() => import("./printer")),
  puzzle: lazy(() => import("./puzzle")),
  refresh: lazy(() => import("./refresh")),
  rocket: lazy(() => import("./rocket")),
  scissors: lazy(() => import("./scissors")),
  search: lazy(() => import("./search")),
  send: lazy(() => import("./send")),
  server: lazy(() => import("./server")),
  settings: lazy(() => import("./settings")),
  share: lazy(() => import("./share")),
  shield: lazy(() => import("./shield")),
  sparkles: lazy(() => import("./sparkles")),
  star: lazy(() => import("./star")),
  sun: lazy(() => import("./sun")),
  tag: lazy(() => import("./tag")),
  target: lazy(() => import("./target")),
  terminal: lazy(() => import("./terminal")),
  trash: lazy(() => import("./trash")),
  trophy: lazy(() => import("./trophy")),
  upload: lazy(() => import("./upload")),
  user: lazy(() => import("./user")),
  users: lazy(() => import("./users")),
  video: lazy(() => import("./video")),
  volume: lazy(() => import("./volume")),
  wand: lazy(() => import("./wand")),
  wifi: lazy(() => import("./wifi")),
  world: lazy(() => import("./world")),
  x: lazy(() => import("./x")),
  "zoom-in": lazy(() => import("./zoom-in")),
  "zoom-out": lazy(() => import("./zoom-out")),
};
