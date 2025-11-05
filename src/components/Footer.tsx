import { motion } from "framer-motion";
// import { useTheme } from "../App"; // Removed
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

// Accept the prop
export default function Footer({ isGsapLoaded }: Props) {
  // All theme logic removed
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    // --- THIS IS THE FIX ---
    // Only run if GSAP is loaded
    if (!isGsapLoaded) return;

    const footer = footerRef.current;
    if (!footer) return;

    let ctx = gsap.context(() => {
      gsap.set(footer, { opacity: 0, y: 100 });
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, [isGsapLoaded]); // <-- Add isGsapLoaded to dependency array

  const footerText = "FLUSH THE FLUFF";

  return (
    <footer
      ref={footerRef}
      className={`relative py-12 bg-white border-t-4 border-brand-yellow overflow-hidden`}
    >
      {/* ... (Marquee elements are unchanged) ... */}
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex will-change-transform"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase inline-block mx-4">
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
          <h2 className="text-4xl md:text-6xl font-display uppercase inline-block mx-4">
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 flex will-change-transform"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase inline-block mx-4">
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
          <h2 className="text-4xl md:text-6xl font-display uppercase inline-block mx-4">
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex will-change-transform"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <h2
            className={`text-4xl md:text-6xl font-display uppercase inline-block mx-4 text-transparent text-stroke-black`}
            style={{ WebkitTextStroke: "1px black" }}
          >
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
          <h2
            className={`text-4xl md:text-6xl font-display uppercase inline-block mx-4 text-transparent text-stroke-black`}
            style={{ WebkitTextStroke: "1px black" }}
          >
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 flex will-change-transform"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <h2
            className={`text-4xl md:text-6xl font-display uppercase inline-block mx-4 text-transparent text-stroke-black`}
            style={{ WebkitTextStroke: "1px black" }}
          >
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
          <h2
            className={`text-4xl md:text-6xl font-display uppercase inline-block mx-4 text-transparent text-stroke-black`}
            style={{ WebkitTextStroke: "1px black" }}
          >
            {footerText} <span className="text-brand-yellow">/</span>
          </h2>
        </motion.div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Flushit Creative. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-brand-yellow transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-brand-yellow transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-brand-yellow transition-colors">
            Vimeo
          </a>
        </div>
      </div>
    </footer>
  );
}
