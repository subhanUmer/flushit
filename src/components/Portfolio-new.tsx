import {
  Play,
  Camera,
  Video,
  Sparkles,
  TrendingUp,
  Palette,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
// We don't need useTheme anymore
import { DoodleCircle, DoodleArrow } from "./Artifacts";
import gsap from "gsap"; // Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register the plugin

export default function Portfolio() {
  const componentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Your Original Data (Unchanged) ---
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

  // --- GSAP Horizontal Scroll Animation ---
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
  }, []); // Empty array is correct

  return (
    <section
      id="work"
      ref={componentRef}
      className={`relative bg-white overflow-hidden`}
    >
      <div
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden bg-white`}
      >
        {/* This is the horizontal track */}
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 flex h-full w-max"
        >
          {/* --- SLIDE 1: Title Card --- */}
          <div className="relative flex h-screen w-screen items-center justify-center p-12">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8">
              <span className={`block text-black`}>FLUSHED</span>
              <motion.span
                className="block bg-gradient-to-r from-yellow-300 via-brand-yellow to-amber-500 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                MASTERPIECES
              </motion.span>
            </h2>
          </div>

          {/* --- PROJECT SLIDES --- */}
          {mediaItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="relative flex h-screen w-screen items-center justify-center p-12 border-l-4 border-dashed"
                style={{
                  borderColor: "rgba(0, 0, 0, 0.1)",
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
                      background:
                        "linear-gradient(90deg, #FFF 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
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
                      className={`text-5xl md:text-7xl font-black uppercase mb-6 text-black`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-xl md:text-2xl max-w-lg text-gray-700`}>
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
