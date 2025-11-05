import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { useTheme } from "../App"; // Removed

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], [data-cursor-magnetic]')
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      backgroundColor: "#facc15",
      width: "16px",
      height: "16px",
      opacity: 1,
    },
    hovering: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1,
      width: "48px",
      height: "48px",
      backgroundColor: "#facc15",
      opacity: 0.3,
    },
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      opacity: 1,
      borderColor: "#facc15",
    },
    hovering: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        className="fixed w-10 h-10 border-2 rounded-full z-[9999] pointer-events-none hidden md:block"
        variants={ringVariants}
        animate={isHoveringLink ? "hovering" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed w-4 h-4 rounded-full z-[9999] pointer-events-none hidden md:block"
        variants={cursorVariants}
        animate={isHoveringLink ? "hovering" : "default"}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </>
  );
}
