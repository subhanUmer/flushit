import { useRef, useLayoutEffect, ReactNode, Fragment } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedWaterBackground from "./AnimatedWaterBackground";
import { Zap, Search, Smile, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ... (whyFlushItData is unchanged) ...
const whyFlushItData = [
  {
    icon: Zap,
    title: "Flush the Fluff",
    description:
      "We believe in clarity. No buzzwords. No ego. Just honest work that makes a difference.",
  },
  {
    icon: Search,
    title: "Insight Over Impulse",
    description:
      "Trends don’t drive us—truth does. We dig deep, ask the uncomfortable questions, and only ship what works.",
  },
  {
    icon: Smile,
    title: "Keep It Human",
    description: "Marketing is for people. Real stories, Real impact.",
  },
  {
    icon: Sparkles,
    title: "Build Boldly",
    description:
      "We love ideas that challenge, provoke, or make people think twice. Safe is boring. We’re not.",
  },
];

// --- 1. ANIMATION COMPONENTS (WITH SPACING FIX) ---
type AnimatedTextWordProps = {
  text: string;
  className?: string;
  highlightWords?: string[]; // Optional array of words to highlight
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
      viewport={{ once: true, amount: 0.3 }} // Trigger earlier
    >
      {words.map((word, index) => {
        // Check if word (with punctuation) is in the highlight list
        const isHighlighted = highlightWords.some((hw) => word.includes(hw));
        return (
          <Fragment key={index}>
            <span className="inline-block overflow-hidden pb-1">
              <motion.span
                className={`inline-block ${
                  isHighlighted ? "text-brand-yellow" : "" // Apply highlight
                }`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
            {"\u00A0"}
            {/* Add a non-breaking space back */}
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
// --- END ANIMATION COMPONENTS ---

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

export default function Philosophy({ isGsapLoaded }: Props) {
  const isDarkMode = false;
  const gsapLoaded = isGsapLoaded;
  const componentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start start", "end end"],
  });
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // --- THIS GSAP LOGIC IS 100% UNCHANGED (Original "jumping" version) ---
  useLayoutEffect(() => {
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
    <section id="philosophy" ref={componentRef} className="relative">
      <div
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden`}
        style={{ scale: 1, opacity: 1 }}
      >
        <AnimatedWaterBackground backgroundX={backgroundX} />
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 z-10 flex h-full w-max items-center"
        >
          {/* --- CARD 1: Who We Are (Part 1) --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <div className="max-w-2xl text-left">
              <AnimatedTextCharacter
                text="Who We Are"
                className="text-6xl md:text-8xl font-black uppercase text-black mb-8"
              />
              <AnimatedTextWord
                text="Flush It is a next-generation marketing studio built to help brands grow through short-form, sustainable, and insight-driven storytelling."
                className="text-xl md:text-2xl text-gray-700 font-medium"
                highlightWords={[
                  "short-form,",
                  "sustainable,",
                  "insight-driven",
                  "storytelling.",
                ]}
              />
              <AnimatedTextWord
                text="We specialise in crafting video content that’s not only creative but strategic, rooted in trends, data, and human insights."
                className="text-xl md:text-2xl text-gray-700 font-medium mt-6"
                highlightWords={[
                  "creative",
                  "strategic,",
                  "trends,",
                  "data,",
                  "insights.",
                ]}
              />
            </div>
          </div>

          {/* --- CARD 2: Who We Are (Part 2) --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <div className="max-w-2xl text-left">
              <AnimatedTextWord
                text="Our goal is simple: to help brands share their stories as powerfully and authentically as possible. At Flush It, we understand that great content isn’t just about picking up a phone and hitting record — it’s about the marriage of creativity, strategy, and execution. That’s why we offer a one-stop, power-packed solution for brands that want to stand out in the digital world."
                className="text-xl md:text-2xl text-gray-700 font-medium"
                highlightWords={[
                  "powerfully",
                  "authentically",
                  "creativity,",
                  "strategy,",
                  "execution.",
                ]}
              />
              <AnimatedTextWord
                text="We’re a collective of Gen Z and millennial creators, marketers, and storytellers who blend creativity with commercial sense, delivering work that’s bold, fresh, and built for impact."
                className="text-xl md:text-2xl text-black font-bold mt-6"
                highlightWords={[
                  "Gen",
                  "Z",
                  "millennial",
                  "bold,",
                  "fresh,",
                  "impact.",
                ]}
              />
            </div>
          </div>

          {/* --- CARD 3: Why Flush IT? (All 4 items) --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <div className="max-w-4xl w-full text-left">
              <AnimatedTextCharacter
                text="Why Flush IT?"
                className="text-6xl md:text-8xl font-black uppercase text-brand-yellow mb-12"
              />
              <motion.div
                className="grid grid-cols-2 gap-x-10 gap-y-8"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {whyFlushItData.map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    variants={listItemVariants}
                  >
                    <item.icon
                      className="text-brand-yellow flex-shrink-0 mt-1"
                      size={32}
                      strokeWidth={3}
                    />
                    <div>
                      <h3 className="text-2xl font-black text-black mb-2 uppercase">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-700 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* --- CARD 4: CTA (Prominent) --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12 bg-brand-yellow">
            <motion.div
              className="text-center"
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <AnimatedTextCharacter
                text="Let’s create"
                className="text-6xl md:text-8xl lg:text-9xl font-black text-black uppercase leading-tight"
              />
              <AnimatedTextCharacter
                text="something worth"
                className="text-6xl md:text-8xl lg:text-9xl font-black text-black uppercase leading-tight"
              />
              <AnimatedTextCharacter
                text="talking about."
                className="text-6xl md:text-8xl lg:text-9xl font-black text-black uppercase leading-tight mb-16"
              />
              <motion.div variants={listItemVariants}>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-black text-white px-12 py-6 font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  GET IN TOUCH
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
