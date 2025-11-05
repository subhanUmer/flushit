import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Animation variants (unchanged)
const overlayVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeIn" },
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "tween", duration: 0.4, ease: "easeOut" },
  },
};
const linkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};
const linkVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Philosophy", href: "#philosophy" },
  { title: "Services", href: "#services" },
  { title: "Work", href: "#work" },
  { title: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] p-4 md:p-6">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-display font-black z-50">
            FLUSH<span className="text-brand-yellow">.</span>
          </a>
          <div className="flex items-center gap-4">
            {/* Theme toggle button removed */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="relative z-50 font-display font-black text-xl p-2"
              aria-label="Open Menu"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9000] bg-brand-yellow text-black p-6 flex flex-col justify-between"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-display font-black">
                FLUSH<span className="text-black">.</span>
              </span>
              <button
                onClick={closeMenu}
                className="font-display font-black text-xl p-2"
                aria-label="Close Menu"
              >
                CLOSE <X size={20} className="inline" />
              </button>
            </div>
            <motion.nav
              className="flex flex-col items-center"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-display text-5xl md:text-7xl uppercase my-3 text-black transition-colors hover:text-white"
                  variants={linkVariants}
                >
                  {link.title}
                </motion.a>
              ))}
            </motion.nav>
            <div className="flex justify-between items-center text-sm font-bold">
              <p>© {new Date().getFullYear()} Flushit Creative</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
                <a href="#" className="hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
