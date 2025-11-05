import {
  Video,
  Camera,
  Palette,
  Sparkles,
  TrendingUp,
  Play,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
// import { useTheme } from "../App"; // Removed
import { DoodleSquiggle, DoodleStar } from "./Artifacts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

// Accept the prop
export default function Services({ isGsapLoaded }: Props) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // All theme logic removed

  const contentRef = useRef(null);

  const services = [
    // ... (services array is unchanged)
    {
      icon: Video,
      title: "CONTENT PRODUCTION",
      bad: "Generic Ads",
      good: "Stories People Watch",
      description: "Organic-style content that doesn't feel like an ad.",
      features: ["Short Films", "UGC Content", "Brand Videos", "Social Media"],
      bgColor: "bg-brand-yellow",
      textColor: "text-black",
    },
    {
      icon: Camera,
      title: "EVENT COVERAGE",
      bad: "Boring B-Roll",
      good: "Captured Energy",
      description: "Every moment that matters, documented with style.",
      features: [
        "Live Coverage",
        "Highlight Reels",
        "Behind Scenes",
        "Documentary",
      ],
      bgColor: "bg-brand-yellow",
      textColor: "text-black",
    },
    {
      icon: Palette,
      title: "BRANDING & DESIGN",
      bad: "Forgettable Logos",
      good: "Iconic Identity",
      description: "Build a brand that actually stands out.",
      features: [
        "Brand Identity",
        "Visual Systems",
        "Motion Graphics",
        "Direction",
      ],
      bgColor: "bg-brand-yellow",
      textColor: "text-black",
    },
    {
      icon: Sparkles,
      title: "AI EXPERIMENTATION",
      bad: "Same Old Content",
      good: "Future-Ready Creations",
      description: "Pushing boundaries with cutting-edge tech.",
      features: [
        "AI Content",
        "Automation",
        "Innovation Labs",
        "Next-Gen Solutions",
      ],
      bgColor: "bg-brand-yellow",
      textColor: "text-black",
    },
  ];

  useLayoutEffect(() => {
    // --- THIS IS THE FIX ---
    // Only run if GSAP is loaded
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
  }, [isGsapLoaded]); // <-- Add isGsapLoaded to dependency array

  return (
    <section
      id="services"
      ref={containerRef}
      className={`py-32 px-6 relative bg-white overflow-hidden`}
    >
      {/* ... (Background parallax elements are unchanged) ... */}
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
                THE WASH CYCLE
                <span className="text-brand-yellow">.</span>
              </h2>
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE
                <span className="text-brand-yellow">.</span>
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
                THE WASH CYCLE
                <span className="text-brand-yellow">.</span>
              </h2>
              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase inline-block mx-4 text-black`}
              >
                THE WASH CYCLE
                <span className="text-brand-yellow">.</span>
              </h2>
            </motion.div>
          </div>
          <motion.p className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto mt-12">
            <span className="text-red-500 line-through">IDENTIFY THE CLOG</span>
            {" → "}
            <span className="text-yellow-500">AGITATE</span>
            {" → "}
            <span className="text-green-500">CLARIFY</span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`relative bg-gray-100 p-6 border-2 border-gray-200 rounded-lg overflow-hidden group cursor-pointer`}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className={`absolute -top-4 -left-4 w-24 h-24 ${service.bgColor} rounded-full blur-2xl transition-all duration-300`}
                animate={{
                  opacity: hoveredIndex === index ? 0.5 : 0.2,
                  scale: hoveredIndex === index ? 1.2 : 1,
                }}
              />
              <div className="relative z-10">
                <service.icon
                  className={`mb-4 transition-colors ${
                    hoveredIndex === index ? "text-black" : "text-brand-yellow"
                  }`}
                  size={32}
                  strokeWidth={3}
                />
                <h3
                  className={`text-xl font-black mb-2 transition-colors ${
                    hoveredIndex === index ? "text-black" : "text-black"
                  }`}
                >
                  {service.title}
                </h3>
                <motion.div className="mb-2 h-12">
                  <motion.p
                    className="text-red-400 line-through font-bold text-xs mb-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? "auto" : 0,
                    }}
                  >
                    {service.bad}
                  </motion.p>
                  <motion.p
                    className="text-black font-bold text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? "auto" : 0,
                    }}
                  >
                    ↓ {service.good}
                  </motion.p>
                </motion.div>
                <p
                  className={`mb-3 font-semibold text-sm transition-colors ${
                    hoveredIndex === index ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
                <ul className="space-y-1 font-bold text-xs">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className={`flex items-center gap-1 transition-colors ${
                        hoveredIndex === index ? "text-black" : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`transition-colors ${
                          hoveredIndex === index
                            ? "text-black"
                            : "text-brand-yellow"
                        }`}
                      >
                        ▸
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                className="absolute inset-0 bg-brand-yellow z-0"
                initial={{ y: "100%" }}
                animate={{ y: hoveredIndex === index ? "0%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-yellow text-black px-12 py-6 font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            START YOUR PROJECT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
