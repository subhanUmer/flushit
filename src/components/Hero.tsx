import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../App';

export default function Hero() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const badIdeas = [
    'GENERIC CONTENT',
    'ZERO ROI',
    'STALE STRATEGY',
    'BORING CAMPAIGNS',
    'MEDIOCRITY',
    'BAD IDEAS',
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.15), transparent 70%)',
          scale,
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="relative inline-block">
            {badIdeas.map((idea, index) => (
              <motion.div
                key={idea}
                initial={{ opacity: 1, y: 0, rotate: 0 }}
                animate={{
                  opacity: [1, 0],
                  y: [0, -100],
                  rotate: [0, Math.random() * 360 - 180],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.3,
                  ease: 'easeIn',
                }}
                className="absolute left-1/2 top-0 -translate-x-1/2 text-gray-600 font-bold text-xl md:text-3xl whitespace-nowrap italic line-through"
                style={{
                  textShadow: '0 0 10px rgba(255,0,0,0.5)',
                }}
              >
                {idea}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none uppercase">
            <motion.span
              className={`block ${isDarkMode ? 'text-white' : 'text-black'}`}
              animate={{
                textShadow: [
                  '0 0 20px rgba(250, 204, 21, 0.5)',
                  '0 0 40px rgba(250, 204, 21, 0.8)',
                  '0 0 20px rgba(250, 204, 21, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              FLUSH
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              THE BAD
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mb-12"
          >
            <p className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>
              WE DON'T BRAINSTORM.
            </p>
            <p className="text-3xl md:text-5xl font-black text-yellow-400">
              WE DETOX.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-12 max-w-4xl mx-auto`}
          >
            Stop swimming in bad ideas. Start making a splash.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 rounded-none font-black text-xl transition-all flex items-center gap-3 uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              CLEAR THE PIPE
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isDarkMode ? 'from-black' : 'from-white'} to-transparent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      />
    </section>
  );
}
