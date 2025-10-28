import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-yellow-400 border-b-4 border-black' 
            : isDarkMode 
              ? 'bg-black/20 backdrop-blur-sm' 
              : 'bg-white/20 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className={`text-3xl font-black uppercase ${
              scrolled ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            flush<span className={scrolled ? 'text-black' : 'text-yellow-400'}>it</span>
          </motion.div>

          <div className="lg:hidden flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className={`${scrolled ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'} hover:text-yellow-400 transition-colors`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={24} strokeWidth={3} /> : <Moon size={24} strokeWidth={3} />}
            </motion.button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${scrolled ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'} hover:text-yellow-400 transition-colors`}
            >
              {isMenuOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {['HOME', 'PHILOSOPHY', 'SERVICES', 'WORK', 'CONTACT'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${
                  scrolled ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'
                } hover:text-yellow-${scrolled ? '600' : '400'} transition-colors font-black text-sm uppercase relative`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.div
                  className={`absolute -bottom-1 left-0 right-0 h-1 ${scrolled ? 'bg-black' : 'bg-yellow-400'}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
            <motion.button
              onClick={toggleTheme}
              className={`${
                scrolled ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'
              } hover:text-yellow-400 transition-colors`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={24} strokeWidth={3} /> : <Moon size={24} strokeWidth={3} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-yellow-400 z-40 lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {['HOME', 'PHILOSOPHY', 'SERVICES', 'WORK', 'CONTACT'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-5xl text-black hover:scale-110 transition-all font-black uppercase"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
