import { motion, MotionValue } from "framer-motion";

type Props = {
  backgroundX: MotionValue<string>;
  // gradient prop removed
};

export default function AnimatedWaterBackground({ backgroundX }: Props) {
  // Gradient is now hard-coded to the light theme
  const backgroundGradient = `linear-gradient(to right, 
    #D3D3D3 0%,   /* 1. Chaos (Pale Gray) */
    white 50%,     /* 2. Team (White) */
    #facc15 100%   /* 3. Clarity (Yellow) */
  )`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="water-flush">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.03"
              numOctaves="1"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.01 0.03;0.03 0.01;0.01 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0"
        style={{
          background: backgroundGradient, // Use the local gradient
          backgroundSize: "200% 100%",
          x: backgroundX,
          filter: "url(#water-flush)",
          scale: 1.1,
        }}
      />
    </div>
  );
}
