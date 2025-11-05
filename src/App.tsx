import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Services from "./components/Services";
import Philosophy from "./components/Philosophy";
import Portfolio from "./components/Portfolio-new";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import HeroShowcase from "./components/HeroShowcase";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

function App() {
  const { scrollYProgress } = useScroll();
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);

  useEffect(() => {
    // Check if scripts are already loaded
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      setIsGsapLoaded(true);
      return;
    }

    let gsapScript: HTMLScriptElement | null = null;
    let scrollTriggerScript: HTMLScriptElement | null = null;

    gsapScript = document.createElement("script");
    gsapScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.async = true;
    document.body.appendChild(gsapScript);

    gsapScript.onload = () => {
      scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      scrollTriggerScript.async = true;
      document.body.appendChild(scrollTriggerScript);

      scrollTriggerScript.onload = () => {
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          setIsGsapLoaded(true); // Set state once loaded
        } else {
          console.error("GSAP or ScrollTrigger failed to load.");
        }
      };
    };
    gsapScript.onerror = () => console.error("Failed to load GSAP script.");

    return () => {
      if (gsapScript && gsapScript.parentElement) {
        document.body.removeChild(gsapScript);
      }
      if (scrollTriggerScript && scrollTriggerScript.parentElement) {
        document.body.removeChild(scrollTriggerScript);
      }
    };
  }, []);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    [
      "rgb(245, 245, 245)",
      "rgb(250, 250, 250)",
      "rgb(251, 191, 36)",
      "rgb(255, 255, 255)",
    ]
  );

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      className={`min-h-screen bg-white text-black overflow-x-hidden relative cursor-none`}
    >
      <CustomCursor />

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundColor, opacity: backgroundOpacity }}
      />

      <div className="relative z-10">
        <Navigation />
        <HeroShowcase isGsapLoaded={isGsapLoaded} />
        <Philosophy isGsapLoaded={isGsapLoaded} />
        <Services isGsapLoaded={isGsapLoaded} />
        <Portfolio isGsapLoaded={isGsapLoaded} />
        <Contact isGsapLoaded={isGsapLoaded} />
        <Footer isGsapLoaded={isGsapLoaded} />
      </div>
    </div>
  );
}

export default App;
