import { motion } from "framer-motion";

// Common props for all doodles
const commonProps = {
  className: "w-full h-full",
  fill: "none",
  viewBox: "0 0 100 100",
  stroke: "currentColor", // This lets us color it with text-brand-yellow
  strokeWidth: "5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** A "clean" sparkle */
export const DoodleSparkle = () => (
  <svg {...commonProps} viewBox="0 0 100 100">
    <path d="M50 10 L50 90" />
    <path d="M10 50 L90 50" />
    <path d="M20 20 L80 80" />
    <path d="M20 80 L80 20" />
  </svg>
);

/** A water swirl */
export const DoodleFlushSwirl = () => (
  <svg {...commonProps} viewBox="0 0 100 100">
    <path d="M50,50 C 50,61.045695 41.045695,70 30,70 C 18.954305,70 10,61.045695 10,50 C 10,38.954305 18.954305,30 30,30 C 41.045695,30 50,38.954305 50,50 Z M50,50 C 50,38.954305 58.954305,30 70,30 C 81.045695,30 90,38.954305 90,50 C 90,61.045695 81.045695,70 70,70 C 58.954305,70 50,61.045695 50,50 Z" />
  </svg>
);

/** A hand-drawn arrow */
export const DoodleArrow = () => (
  <svg {...commonProps} viewBox="0 0 100 100">
    <path d="M20 50 L80 50" />
    <path d="M65 35 L80 50 L65 65" />
  </svg>
);

/** A hand-drawn circle */
export const DoodleCircle = () => (
  <svg {...commonProps} strokeWidth="4" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="40" opacity="0.6" />
  </svg>
);

/** A plunger (the ultimate "flushit" artifact) */
export const DoodlePlunger = () => (
  <svg {...commonProps} viewBox="0 0 100 100">
    <path d="M50 90 L50 40" />
    <path d="M30 40 L70 40" />
    <path d="M20 50 Q 50 80 80 50" />
    <path d="M20 50 L80 50" />
  </svg>
);
