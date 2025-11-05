import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useState, useRef, useLayoutEffect, Fragment } from "react";
import { motion, useInView } from "framer-motion";
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

// ... (whyWorkData is unchanged) ...
const whyWorkData = [
  {
    title: "Creative Freedom",
    description:
      "You get space to experiment, pitch, and lead bold ideas—no micromanaging here.",
  },
  {
    title: "Small Team, Big Energy",
    description:
      "No middle layers. You work directly with decision-makers and get things done fast.",
  },
  {
    title: "Real Impact",
    description:
      "We work with brands that are growing or just getting started—so your work actually matters.",
  },
  {
    title: "Open Culture",
    description:
      "We believe the best idea wins. Titles don’t matter—insights do.",
  },
];

export default function Contact({ isGsapLoaded }: Props) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    chaos: "",
    clarity: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // --- GSAP LOGIC (Unchanged) ---
  useLayoutEffect(() => {
    if (!isGsapLoaded) return;
    const content = contentRef.current;
    if (!content || !containerRef.current) return;
    let ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 100 });
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isGsapLoaded]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`py-32 px-6 relative overflow-hidden bg-white`}
    >
      <div
        className="absolute inset-0 z-0 bg-dot-pattern"
        style={{
          backgroundSize: "20px 20px",
          "--dot-color": "var(--dot-color-light)",
          opacity: 0.5,
        }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-brand-yellow z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* --- NEW TEAM & CAREERS SECTION (Unchanged) --- */}
      <div className="max-w-7xl mx-auto relative z-10 mb-32">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* --- Our Team --- */}
          <div className="lg:col-span-2">
            <AnimatedTextCharacter
              text="Our Team"
              className="text-5xl md:text-7xl font-black uppercase text-black mb-8"
            />
            <AnimatedTextWord
              text="We’re a team of Millennials and Gen Z professionals from Pakistan’s top business and creative schools, united by a mission to shape distinctive local brands with global-standard work."
              className="text-xl md:text-2xl text-gray-700 space-y-6 font-medium mb-8"
              highlightWords={["Millennials", "Gen", "Z", "global-standard"]}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`bg-brand-yellow text-black px-8 py-4 font-black text-lg uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}
            >
              Catch an online cuppa with us
            </motion.button>
          </div>
          {/* --- Why Work With Us --- */}
          <div className="lg:col-span-3">
            <AnimatedTextCharacter
              text="Why Work With Us"
              className="text-4xl font-black text-black uppercase mb-8"
            />
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-12"
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {whyWorkData.map((item) => (
                <motion.div key={item.title} variants={listItemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle
                      className="text-brand-yellow"
                      size={20}
                      strokeWidth={3}
                    />
                    <h4 className="text-xl font-black text-black">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            {/* --- Careers --- */}
            <motion.div
              className="bg-gray-100 p-6 border-2 border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-black text-black uppercase mb-3">
                Join our team
              </h3>
              <p className="text-gray-700 font-medium">
                We currently have no vacancies, but still want to get in touch.
                Email us at{" "}
                <a
                  href="mailto:hi@flushit.com.pk"
                  className="font-bold text-brand-yellow hover:underline"
                >
                  hi@flushit.com.pk
                </a>{" "}
                with your info.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* --- END NEW SECTION --- */}

      <div
        id="contact-form"
        ref={contentRef}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-20">
          {/* --- THIS IS THE FIX (Text Size) --- */}
          <AnimatedTextCharacter
            text="Let’s create"
            className="text-6xl md:text-8xl lg:text-8xl font-black uppercase leading-none text-brand-yellow" // Changed to lg:text-8xl
          />
          <AnimatedTextCharacter
            text="something worth"
            className="text-6xl md:text-8xl lg:text-8xl font-black uppercase leading-none text-black" // Changed to lg:text-8xl
          />
          <AnimatedTextCharacter
            text="talking about."
            className="text-6xl md:text-8xl lg:text-8xl font-black uppercase leading-none text-black" // Changed to lg:text-8xl
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div>
            <h3 className={`text-4xl font-black mb-8 text-black uppercase`}>
              Get in Touch
            </h3>
            {/* ... (Rest of form is unchanged) ... */}
            <div className="space-y-6 mb-12">
              <motion.div
                className={`flex items-start gap-4 bg-black p-6 border-4 border-white`}
                whileHover={{
                  x: 10,
                  boxShadow: "8px 8px 0px 0px rgba(250,204,21,1)",
                }}
              >
                <div
                  className={`bg-brand-yellow w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 border-white`}
                >
                  <Mail className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 text-white uppercase`}>
                    Email Us
                  </h4>
                  <a
                    href="mailto:hello@flushit.com.pk"
                    className={`text-gray-300 hover:text-brand-yellow transition-colors font-bold`}
                  >
                    hello@flushit.com.pk
                  </a>
                </div>
              </motion.div>
              <motion.div
                className={`flex items-start gap-4 bg-black p-6 border-4 border-white`}
                whileHover={{
                  x: 10,
                  boxShadow: "8px 8px 0px 0px rgba(250,204,21,1)",
                }}
              >
                <div
                  className={`bg-brand-yellow w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 border-white`}
                >
                  <Phone className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 text-white uppercase`}>
                    Call Us
                  </h4>
                  <a
                    href="tel:+92-XXX-XXXXXXX"
                    className={`text-gray-300 hover:text-brand-yellow transition-colors font-bold`}
                  >
                    +92-XXX-XXXXXXX
                  </a>
                </div>
              </motion.div>
              <motion.div
                className={`flex items-start gap-4 bg-black p-6 border-4 border-white`}
                whileHover={{
                  x: 10,
                  boxShadow: "8px 8px 0px 0px rgba(250,204,21,1)",
                }}
              >
                <div
                  className={`bg-brand-yellow w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 border-white`}
                >
                  <MapPin className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 text-white uppercase`}>
                    Visit Us
                  </h4>
                  <p className={`text-gray-300 font-bold`}>Pakistan</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className={`bg-black p-8 border-4 border-white`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-black mb-2 uppercase text-white`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full bg-gray-900 border-4 border-white px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors font-bold text-white`}
                  placeholder="JOHN DOE"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-black mb-2 uppercase text-white`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full bg-gray-900 border-4 border-white px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors font-bold text-white`}
                  placeholder="JOHN@COMPANY.COM"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="chaos"
                  className={`block text-sm font-black mb-2 uppercase text-white`}
                >
                  Your Chaos? (Project Details)
                </label>
                <textarea
                  id="chaos"
                  value={formData.chaos}
                  onChange={(e) =>
                    setFormData({ ...formData, chaos: e.target.value })
                  }
                  rows={4}
                  className={`w-full bg-gray-900 border-4 border-white px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors resize-none font-bold text-white`}
                  placeholder="TELL US ABOUT THE CURRENT PROBLEM..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="clarity"
                  className={`block text-sm font-black mb-2 uppercase text-white`}
                >
                  Desired Clarity? (Your Goals)
                </label>
                <textarea
                  id="clarity"
                  value={formData.clarity}
                  onChange={(e) =>
                    setFormData({ ...formData, clarity: e.target.value })
                  }
                  rows={3}
                  className={`w-full bg-gray-900 border-4 border-white px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors resize-none font-bold text-white`}
                  placeholder="WHAT DOES SUCCESS LOOK LIKE?..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "8px 8px 0px 0px rgba(255,255,255,1)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-brand-yellow hover:bg-yellow-300 text-black px-8 py-4 font-black text-xl uppercase transition-all border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]`}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className={`mt-32 pt-12 border-t-4 border-black`}>
        <motion.div className="max-w-7xl mx-auto text-center">
          <div className="text-5xl font-black mb-4 uppercase">
            <span className={`text-black`}>flush</span>
            <span className="text-brand-yellow">it</span>
          </div>
          <p className={`text-black font-bold text-xl mb-4 uppercase`}>
            Clear. Create. Flow. Repeat.
          </p>
          <p className="text-gray-500 text-sm font-bold uppercase">
            © 2024 Flushit. Flushing bad ideas since inception.
          </p>
        </motion.div>
      </footer>
    </section>
  );
}
