import {
  Play,
  Camera,
  Video,
  Sparkles,
  TrendingUp,
  Palette,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect, Fragment } from "react";
import { DoodleCircle, DoodleArrow } from "./Artifacts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ... (AnimatedTextWord and AnimatedTextCharacter components are unchanged) ...
type AnimatedTextWordProps = {
  text: string;
  className?: string;
  highlightWords?: string[];
};
const AnimatedTextWord = ({
  text,
  className,
  highlightWords = [],
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
      whileInView="visible"
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
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

export default function Portfolio({ isGsapLoaded }: Props) {
  const isDarkMode = false;
  const gsapLoaded = isGsapLoaded;
  const componentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ... (mediaItems array is unchanged) ...
  const mediaItems = [
    {
      id: 1,
      title: "ETERNA HEALTH",
      category: "Corporate Documentary",
      type: "image",
      thumbnail: "/media/Eterna-Health-768x432.png",
      videoUrl: null,
      description: "Healthcare brand transformation",
      icon: Video,
    },
    {
      id: 2,
      title: "ORAAN GOLD LAUNCH",
      category: "Motion Graphics",
      type: "video",
      thumbnail: "/media/Oraan-768x432.png",
      videoUrl: "/media/Oraan-Gold-Launch-Final.mp4",
      description: "Empowering women through fintech",
      icon: Sparkles,
    },
    {
      id: 3,
      title: "WINGOS",
      category: "Photography",
      type: "image",
      thumbnail: "/media/Wingos-768x432.png",
      videoUrl: null,
      description: "Food culture energy",
      icon: Camera,
    },
    {
      id: 4,
      title: "KICKSTART",
      category: "Testimonials",
      type: "video",
      thumbnail: "/media/Your-paragraph-text-768x960.png",
      videoUrl: "/media/Kickstart-cups-of-tea.mov",
      description: "Real startup stories",
      icon: TrendingUp,
    },
    {
      id: 5,
      title: "5K CHALLENGE",
      category: "Motion Graphics",
      type: "video",
      thumbnail: "/media/5k-challenge-768x1365.png",
      videoUrl: "/media/5k-in-5-mins-fonts-updated.mp4",
      description: "Fitness motivation",
      icon: Video,
    },
    {
      id: 6,
      title: "HUMANIZING WORKSPACES",
      category: "Corporate Documentary",
      type: "image",
      thumbnail: "/media/Humanizing-Workspaces-768x432.png",
      videoUrl: null,
      description: "Office culture transformation",
      icon: Camera,
    },
    {
      id: 7,
      title: "B.GUTSY X SAFEPAY",
      category: "DVC",
      type: "video",
      thumbnail: "/media/Frame-1597884324-768x1365.png",
      videoUrl: "/media/B.Gutsy-x-SafePay-v6.mp4",
      description: "Fintech collaboration",
      icon: Palette,
    },
  ];

  // --- THIS GSAP LOGIC IS 100% UNCHANGED (Original "jumping" version) ---
  useLayoutEffect(() => {
    // ... (unchanged) ...
    if (gsapLoaded && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const horizontalScroll = scrollRef.current;
      const pinElement = pinRef.current;
      const componentElement = componentRef.current;
      if (!horizontalScroll || !pinElement || !componentElement) return;
      const scrollWidth = horizontalScroll.scrollWidth - window.innerWidth;
      const fadeOutDuration = window.innerHeight;
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: componentElement,
            pin: pinElement,
            scrub: 1,
            start: "top top",
            end: `+=${scrollWidth + fadeOutDuration}`,
          },
        });
        tl.to(horizontalScroll, { x: -scrollWidth, ease: "none" });
        tl.to(pinElement, { scale: 0.9, opacity: 0, ease: "power2.inOut" });
      }, componentRef);
      return () => {
        if (ctx) {
          ctx.revert();
        }
      };
    }
  }, [gsapLoaded, isDarkMode]);
  // --- END UNCHANGED GSAP LOGIC ---

  return (
    <section
      id="work"
      ref={componentRef}
      className={`relative ${
        isDarkMode ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      <div
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
        style={{ scale: 1, opacity: 1 }}
      >
        {/* This is the horizontal track */}
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 flex h-full w-max"
        >
          {/* --- SLIDE 1: Title Card (UPDATED) --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <div className="max-w-4xl text-left">
              {/* --- THIS IS THE FIX (Text Size) --- */}
              <AnimatedTextCharacter
                text="Clients & Work"
                className="text-6xl md:text-7xl lg:text-7xl font-black uppercase leading-none" // Changed to lg:text-7xl
              />
              <AnimatedTextCharacter
                text="What We’ve Cooked"
                className="text-6xl md:text-7xl lg:text-7xl font-black uppercase leading-none mb-8 bg-gradient-to-r from-yellow-300 via-brand-yellow to-amber-500 bg-clip-text text-transparent" // Changed to lg:text-7xl
              />
              {/* --- END FIX --- */}
              <AnimatedTextWord
                text="Discover how we helped businesses unlock their growth and achieve tangible results."
                className={`text-xl md:text-2xl mb-6 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                highlightWords={["growth", "tangible", "results."]}
              />
              <motion.ul
                className={`text-lg md:text-xl font-bold space-y-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.li variants={listItemVariants}>
                  → Local SMEs with no online presence
                </motion.li>
                <motion.li variants={listItemVariants}>
                  → Tech startups needing social content
                </motion.li>
                <motion.li variants={listItemVariants}>
                  → New businesses finding their brand voice
                </motion.li>
              </motion.ul>
            </div>
          </div>

          {/* --- PROJECT SLIDES (Unchanged) --- */}
          {mediaItems.map((item, index) => {
            // ... (rest of the portfolio cards are unchanged) ...
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="relative flex h-screen w-screen items-center justify-center p-12 border-l-4 border-dashed"
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Background Video / Image */}
                <div className="absolute inset-0 z-0">
                  {item.type === "video" && item.videoUrl ? (
                    <video
                      key={`video-${item.id}`}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={item.thumbnail}
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Gradient overlay for text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
                        : "linear-gradient(90deg, #FFF 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-2">
                  <div className="pr-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black font-black text-sm mb-4 uppercase">
                      <IconComponent size={16} />
                      {item.category}
                    </div>
                    <h3
                      className={`text-5xl md:text-7xl font-black uppercase mb-6 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xl md:text-2xl max-w-lg ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* --- SLIDE END: CTA Card --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12 bg-brand-yellow">
            <h3
              className={`text-6xl md:text-8xl lg:text-9xl font-black mb-12 text-black uppercase text-center`}
            >
              READY TO
              <br />
              FLUSH YOURS?
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`absolute bottom-24 bg-black text-white px-12 py-6 font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all`}
            >
              LET'S TALK
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
