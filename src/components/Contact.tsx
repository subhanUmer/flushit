import { Mail, Phone, MapPin } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
// import { useTheme } from "../App"; // Removed
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

// Accept the prop
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

      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-20">
          <h2
            className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8 text-black`}
          >
            READY TO
            <br />
            <span className="text-brand-yellow">CLEAR THE PIPE?</span>
          </h2>
          <p className={`text-2xl font-bold text-gray-700`}>
            STOP SWIMMING IN BAD IDEAS. START MAKING A SPLASH.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div>
            <h3 className={`text-4xl font-black mb-8 text-black uppercase`}>
              Get in Touch
            </h3>

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
