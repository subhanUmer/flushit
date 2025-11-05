import { useState, createContext, useContext, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Services from "./components/Services";
import Philosophy from "./components/Philosophy";
import Portfolio from "./components/Portfolio-new";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import HeroShowcase from "./components/HeroShowcase";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

// --- REMOVED ThemeContext and useTheme ---

function App() {
  // --- REMOVED isDarkMode state and toggleTheme function ---
  const { scrollYProgress } = useScroll();

  // ... (GSAP useEffect remains unchanged) ...
  useEffect(() => {
    // Check if GSAP is already loaded
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      return;
    }

    let gsapScript: HTMLScriptElement | null = null;
    let scrollTriggerScript: HTMLScriptElement | null = null;

    // Load GSAP
    gsapScript = document.createElement("script");
    gsapScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.async = true;
    document.body.appendChild(gsapScript);

    // Load ScrollTrigger after GSAP
    gsapScript.onload = () => {
      scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      scrollTriggerScript.async = true;
      document.body.appendChild(scrollTriggerScript);

      // When ScrollTrigger loads, register it
      scrollTriggerScript.onload = () => {
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        } else {
          console.error("GSAP or ScrollTrigger failed to load.");
        }
      };
    };

    gsapScript.onerror = () => console.error("Failed to load GSAP script.");

    // Cleanup function
    return () => {
      if (gsapScript && gsapScript.parentElement) {
        document.body.removeChild(gsapScript);
      }
      if (scrollTriggerScript && scrollTriggerScript.parentElement) {
        document.body.removeChild(scrollTriggerScript);
      }
    };
  }, []); // Run only once on component mount

  // --- MODIFIED: Removed ternary, hard-coded to light theme ---
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    [
      "rgb(245, 245, 245)", // Light gray
      "rgb(250, 250, 250)", // Lighter gray
      "rgb(251, 191, 36)", // Yellow-400 (bright flush)
      "rgb(255, 255, 255)", // White (final)
    ]
  );

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    // --- REMOVED ThemeContext.Provider ---
    <div
      // --- MODIFIED: Hard-coded to light theme ---
      className={`min-h-screen bg-white text-black overflow-x-hidden relative cursor-none`}
    >
      <CustomCursor />

      {/* Scroll-based color transition background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundColor, opacity: backgroundOpacity }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <HeroShowcase />
        <Philosophy />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
    // --- REMOVED ThemeContext.Provider ---
  );
}

export default App;
