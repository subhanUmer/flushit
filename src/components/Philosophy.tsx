import { useRef, useLayoutEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
// We don't need useTheme anymore
import gsap from "gsap"; // Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register the plugin

// --- 1. DATA FOR "FLUSH MASTERS" ---
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

// --- 2. DATA FOR "IDEA CLOUDS" ---
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

// --- 3. REBUILT HORIZONTAL SCROLL COMPONENT ---
export default function Philosophy() {
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
    #D3D3D3 0%,                 /* 1. Chaos (Pale Gray) */
    white 50%,                 /* 2. Team (White) */
    #facc15 100%                 /* 3. Clarity (Yellow) */
  )`;

  // --- 5. GSAP LAYOUT EFFECT ---
  useLayoutEffect(() => {
    // --- THIS IS THE FIX ---
    // We add a short delay to wait for App.tsx to load GSAP
    // and for the browser to paint the scrollable elements.
    const timeout = setTimeout(() => {
      if (window.gsap && window.ScrollTrigger) {
        const gsap = window.gsap;
        const horizontalScroll = scrollRef.current;
        const pinElement = pinRef.current;
        const componentElement = componentRef.current;
        if (!horizontalScroll || !pinElement || !componentElement) return;

        const scrollWidth = horizontalScroll.scrollWidth - window.innerWidth;

        let ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: componentElement,
              pin: pinElement,
              scrub: 1,
              start: "top top",
              end: `+=${scrollWidth}`,
            },
          });

          tl.to(horizontalScroll, {
            x: -scrollWidth,
            ease: "none",
          });
        }, componentRef);

        return () => ctx.revert();
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timeout);
  }, []); // Empty array is correct, timeout handles the race condition

  return (
    <section id="philosophy" ref={componentRef} className="relative">
      <div ref={pinRef} className={`relative h-screen w-full overflow-hidden`}>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: backgroundGradient,
            backgroundSize: "200% 100%",
            x: backgroundX,
          }}
        />

        <div
          ref={scrollRef}
          className="absolute top-0 left-0 z-10 flex h-full w-max items-center"
        >
          {/* --- CHAPTER 1: THE CHAOS --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <h2
              className={`text-center text-7xl md:text-9xl font-black uppercase text-gray-500`}
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
              className={`text-center text-6xl md:text-8xl font-black uppercase text-black mr-16`}
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
                className={`text-center p-6 border-4 border-black bg-white/50 backdrop-blur-sm w-80 flex-shrink-0`}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300 border-4 border-black object-cover`}
                  onError={(e) =>
                    (e.currentTarget.style.backgroundColor = "#facc15")
                  }
                />
                <h3 className={`text-2xl font-black uppercase text-black`}>
                  {member.name}
                </h3>
                <h4 className="text-brand-yellow font-bold uppercase text-sm mb-3">
                  {member.title}
                </h4>
                <p className={`font-medium italic text-gray-700`}>
                  "{member.pun}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* --- CHAPTER 3: THE CLARITY --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <h2
              className={`text-center text-7xl md:text-9xl font-black uppercase text-black`}
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
