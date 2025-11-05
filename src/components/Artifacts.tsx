import { motion } from "framer-motion";

const commonProps = {
  className: "w-full h-full",
  fill: "none",
  viewBox: "0 0 100 100",
  stroke: "#facc15", // brand-yellow
  strokeWidth: "5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const DoodleStar = () => (
  <svg {...commonProps}>
    <path d="M50 10 L61.2 35.5 L88.8 38.2 L68.2 56.5 L73.6 83.8 L50 70 L26.4 83.8 L31.8 56.5 L11.2 38.2 L38.8 35.5 Z" />
  </svg>
);

export const DoodleSquiggle = () => (
  <svg {...commonProps}>
    <path d="M10 50 C 20 20, 30 80, 40 50 S 60 20, 70 50 S 90 80, 90 50" />
  </svg>
);

export const DoodleCircle = () => (
  <svg {...commonProps} strokeWidth="4">
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="40" opacity="0.6" />
  </svg>
);

export const DoodleArrow = () => (
  <svg {...commonProps}>
    <path d="M20 50 L80 50" />
    <path d="M65 35 L80 50 L65 65" />
  </svg>
);
