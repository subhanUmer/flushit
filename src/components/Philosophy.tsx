import { useRef, useLayoutEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedWaterBackground from "./AnimatedWaterBackground";
// import { useTheme } from "../App"; // Removed

gsap.registerPlugin(ScrollTrigger);

// ... (team, badIdeas, goodIdeas data is unchanged) ...
const team = [
  {
    name: "Jane 'Drain' Doe",
    title: "Chief Flush Officer",
    pun: "Drains the mundane, daily.",
    img: "https://source.unsplash.com/400x400/?portrait,woman,professional",
  },
  {
    name: "Mike 'Plunger' Smith",
    title: "Head of Agitation",
    pun: "Unclogs creative pipelines.",
    img: "https://source.unsplash.com/400x400/?portrait,man,professional",
  },
  {
    name: "Alex 'Swirl' Johnson",
    title: "Director of Clarity",
    pun: "Finds the signal in the noise.",
    img: "https://source.unsplash.com/400x400/?portrait,person,professional",
  },
];
const badIdeas = [
  "CLUTTER",
  "NOISE",
  "BORING",
  "GENERIC",
  "FORGETTABLE",
  "SAFE",
  "MUNDANE",
  "CLOGGED",
  "STUCK",
];
const goodIdeas = [
  "IMPACT",
  "CLARITY",
  "STORIES",
  "ENERGY",
  "ICONIC",
  "BOLD",
  "STICKY",
  "FLUSHED",
  "FLOW",
];

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

export default function Philosophy({ isGsapLoaded }: Props) {
  // const { isDarkMode, gsapLoaded } = useTheme(); // Removed
  const isDarkMode = false; // Hard-coded to light theme
  const gsapLoaded = isGsapLoaded; // Use prop

  const componentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const teamRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start start", "end end"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  const backgroundGradient = `linear-gradient(to right, 
    #D3D3D3 0%,
    ${isDarkMode ? "black" : "white"} 50%,
    #facc15 100%
  )`;

  useLayoutEffect(() => {
    if (gsapLoaded && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const horizontalScroll = scrollRef.current;
      const pinElement = pinRef.current;
      const componentElement = componentRef.current;
      if (!horizontalScroll || !pinElement || !componentElement) return;

      const scrollWidth = horizontalScroll.scrollWidth - window.innerWidth;

      // --- 1. ADD EXTRA SCROLL DURATION FOR THE FADE-OUT ---
      const fadeOutDuration = window.innerHeight; // 100vh

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: componentElement,
            pin: pinElement,
            scrub: 1,
            start: "top top",
            // --- 2. ADD THE DURATION TO THE 'end' ---
            end: `+=${scrollWidth + fadeOutDuration}`,
          },
        });

        // --- 3. FIRST, do the horizontal scroll ---
        tl.to(horizontalScroll, {
          x: -scrollWidth,
          ease: "none",
        });

        // --- 4. NEW: THEN, fade out the *entire* pinned section ---
        tl.to(pinElement, {
          scale: 0.9, // Gently shrink the section
          opacity: 0, // Fade it out
          ease: "power2.inOut",
        });
      }, componentRef);

      return () => ctx.revert();
    }
  }, [gsapLoaded, isDarkMode]);

  return (
    <section id="philosophy" ref={componentRef} className="relative">
      <div
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden`}
        // Set initial scale and opacity for the fade-out
        style={{ scale: 1, opacity: 1 }}
      >
        <AnimatedWaterBackground
          backgroundX={backgroundX}
          gradient={backgroundGradient}
        />

        <div
          ref={scrollRef}
          className="absolute top-0 left-0 z-10 flex h-full w-max items-center"
        >
          {/* --- CHAPTER 1: THE CHAOS --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <h2
              className={`text-center text-7xl md:text-9xl font-black uppercase ${
                isDarkMode ? "text-gray-700" : "text-gray-500"
              }`}
            >
              DROWNING
              <br />
              IN CHAOS?
            </h2>
            {badIdeas.map((idea, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl font-black text-brand-pale-gray opacity-50"
                style={{
                  top: `${10 + ((i * 13) % 80)}%`,
                  left: `${10 + ((i * 23) % 80)}%`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {idea}
              </motion.span>
            ))}
          </div>

          {/* --- CHAPTER 2: THE FLUSH MASTERS --- */}
          <div
            ref={teamRef}
            className="flex h-screen w-auto items-center justify-center gap-8 p-12"
          >
            <h2
              className={`text-center text-6xl md:text-8xl font-black uppercase ${
                isDarkMode ? "text-white" : "text-black"
              } mr-16`}
            >
              MEET THE
              <br />
              <span className="text-brand-yellow">
                FLUSH
                <br />
                MASTERS
              </span>
            </h2>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className={`text-center p-6 border-4 ${
                  isDarkMode ? "border-white" : "border-black"
                } ${
                  isDarkMode ? "bg-black/50" : "bg-white/50"
                } backdrop-blur-sm w-80 flex-shrink-0`}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300 border-4 ${
                    isDarkMode ? "border-white" : "border-black"
                  } object-cover`}
                  onError={(e) =>
                    (e.currentTarget.style.backgroundColor = "#facc15")
                  }
                />
                <h3
                  className={`text-2xl font-black uppercase ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {member.name}
                </h3>
                <h4 className="text-brand-yellow font-bold uppercase text-sm mb-3">
                  {member.title}
                </h4>
                <p
                  className={`font-medium italic ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{member.pun}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* --- CHAPTER 3: THE CLARITY --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <h2
              className={`text-center text-7xl md:text-9xl font-black uppercase ${
                isDarkMode ? "text-black" : "text-black"
              }`}
            >
              WE RETAIN
              <br />
              BOLD IDEAS.
            </h2>
            {goodIdeas.map((idea, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl font-black text-yellow-600 opacity-70"
                style={{
                  top: `${10 + ((i * 13) % 80)}%`,
                  left: `${10 + ((i * 23) % 80)}%`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {idea}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
