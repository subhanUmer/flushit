import { useState, createContext, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import Philosophy from './components/Philosophy';
import Portfolio from './components/Portfolio-new';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Transform scroll progress - murky dark to bright yellow
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    isDarkMode
      ? [
          'rgb(20, 20, 20)',    // Dark murky (almost black)
          'rgb(40, 35, 30)',    // Dark brown-gray (murky)
          'rgb(251, 191, 36)',  // Yellow-400 (bright flush)
          'rgb(0, 0, 0)'        // Black (final)
        ]
      : [
          'rgb(245, 245, 245)', // Light gray
          'rgb(250, 250, 250)', // Lighter gray
          'rgb(251, 191, 36)',  // Yellow-400 (bright flush)
          'rgb(255, 255, 255)'  // White (final)
        ]
  );

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} overflow-x-hidden relative`}>
        {/* Scroll-based color transition background */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundColor, opacity: backgroundOpacity }}
        />


        {/* Content */}
        <div className="relative z-10">
          <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Hero />
          <Philosophy />
          <Services />
          <Portfolio />
          <Contact />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
