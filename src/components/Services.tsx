import {
  Video,
  Edit3, // Using Edit3 for storytelling
  Users, // Using Users for UGC
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect, Fragment } from "react";
import { DoodleSquiggle, DoodleStar } from "./Artifacts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ... (AnimatedTextWord and AnimatedTextCharacter components are unchanged) ...
type AnimatedTextWordProps = {
  text: string;
  className?: string;
  highlightWords?: string[];
  animate?: "visible" | "hidden"; // Control for hover
};
const AnimatedTextWord = ({
  text,
  className,
  highlightWords = [],
  animate,
}: AnimatedTextWordProps) => {
  const words = text.split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const wordVariants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.5, ease: "easeOut" } },
  };
  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView={!animate ? "visible" : "hidden"}
      animate={animate} // Manually control animation
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some((hw) => word.includes(hw));
        return (
          <Fragment key={index}>
            <span className="inline-block overflow-hidden pb-1">
              <motion.span
                className={`inline-block ${
                  isHighlighted ? "text-brand-yellow" : ""
                }`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
            {"\u00A0"}
          </Fragment>
        );
      })}
    </motion.p>
  );
};
type AnimatedTextCharacterProps = {
  text: string;
  className?: string;
};
const AnimatedTextCharacter = ({
  text,
  className,
}: AnimatedTextCharacterProps) => {
  const letters = Array.from(text);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };
  const charVariants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.4, ease: "easeOut" } },
  };
  return (
    <motion.h2
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {letters.map((char, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={charVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

// ... (services data is unchanged) ...
const services = [
  {
    icon: Video,
    title: "Video Production",
    description: "Scroll-stopping visuals, crafted in-house.",
    highlights: ["Scroll-stopping"],
  },
  {
    icon: Edit3,
    title: "Content Creation & Storytelling",
    description:
      "Not just pretty posts—compelling stories made for your audience and channel.",
    highlights: ["compelling", "stories"],
  },
  {
    icon: Users,
    title: "UGC Style Content",
    description: "We build brand advocates.",
    highlights: ["brand", "advocates."],
  },
];

export default function Services({ isGsapLoaded }: Props) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const contentRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- GSAP LOGIC (Unchanged) ---
  useLayoutEffect(() => {
    // ... (unchanged) ...
    if (!isGsapLoaded) return;
    const content = contentRef.current;
    const section = containerRef.current;
    if (!content || !section) return;
    let ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 100 });
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isGsapLoaded]);

  return (
    <section
      id="services"
      ref={containerRef}
      className={`py-32 px-6 relative bg-white overflow-hidden`}
    >
      {/* --- BACKGROUND ARTIFACTS (Unchanged) --- */}
      <motion.div
        className="absolute top-1/4 left-12 w-24 h-24 opacity-20 z-0"
        animate={{ y: [-10, 10], rotate: [0, -15] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <DoodleSquiggle />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-12 w-16 h-16 opacity-20 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <DoodleStar />
      </motion.div>
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-brand-yellow rounded-full opacity-10 z-0"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-brand-yellow rounded-full opacity-10 z-0"
        animate={{ x: [0, -80, 0], y: [0, 80, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-0 left-0 w-full h-3 bg-brand-yellow z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{ transformOrigin: "left" }}
      />

      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 overflow-hidden">
          {/* ... (Marquee H2 elements are unchanged) ... */}
          <div className="relative flex whitespace-nowrap overflow-hidden">
            <motion.div
              className="flex animate-marquee will-change-transform"
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE <span className="text-brand-yellow">.</span>
              </h2>
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE <span className="text-brand-yellow">.</span>
              </h2>
            </motion.div>
            <motion.div
              className="absolute top-0 left-0 flex animate-marquee will-change-transform"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE <span className="text-brand-yellow">.</span>
              </h2>
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE <span className="text-brand-yellow">.</span>
              </h2>
            </motion.div>
          </div>

          <AnimatedTextCharacter
            text="Our Services"
            className="text-5xl md:text-7xl font-black uppercase text-black mt-12"
          />
        </div>

        {/* --- UPDATED SERVICES LIST WITH WATER HOVER --- */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`relative bg-gray-100 p-8 border-4 border-black overflow-hidden cursor-pointer`}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative z-10">
                <motion.div
                  animate={{
                    color: hoveredIndex === index ? "#000000" : "#facc15",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon className={`mb-4`} size={40} strokeWidth={3} />
                </motion.div>

                {/* --- THIS IS THE FIX (Text Size) --- */}
                <motion.h3
                  animate={{
                    color: hoveredIndex === index ? "#000000" : "#000000",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-black mb-3 text-black uppercase`} // Changed to 2xl
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  animate={{
                    color: hoveredIndex === index ? "#333333" : "#4B5563",
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-base font-medium" // Changed to text-base
                >
                  {service.description}
                </motion.p>
              </div>

              {/* --- THIS IS THE FIX (Water Effect) --- */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 w-full bg-brand-yellow z-0"
                style={{
                  filter: "url(#water-flush)",
                  scale: 1.2, // Increased scale
                }}
                initial={{ height: "0%", opacity: 0 }}
                animate={{
                  height: hoveredIndex === index ? "100%" : "0%",
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>
        {/* --- END UPDATED SERVICES LIST --- */}

        {/* --- BUTTON (Unchanged) --- */}
        <motion.div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-yellow text-black px-12 py-6 font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            SEE OUR WORK
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
