import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../App';

export default function Philosophy() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className={`py-32 px-6 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-7xl md:text-9xl font-black uppercase leading-none mb-12"
            style={{ rotateX }}
          >
            <span className={`block ${isDarkMode ? 'text-white' : 'text-black'}`}>WE DON'T</span>
            <span className={`block ${isDarkMode ? 'text-white' : 'text-black'}`}>BRAINSTORM.</span>
            <motion.span
              className="block text-transparent"
              style={{
                WebkitTextStroke: '2px #00ffff',
                textStroke: '2px #00ffff',
              }}
              animate={{
                WebkitTextStroke: ['2px #00ffff', '2px #ff00ff', '2px #00ffff'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              WE DETOX.
            </motion.span>
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto bg-yellow-400 text-black p-12 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -180, -360],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <h3 className="text-4xl md:text-5xl font-black mb-6 relative z-10">
              "FLUSH THE BAD IDEAS, MEDIOCRITY AND BORING CAMPAIGNS"
            </h3>
            <p className="text-2xl font-bold relative z-10">
              THAT'S NOT JUST OUR MOTTO—IT'S OUR PROMISE.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'BAD IDEAS',
              status: 'DISAPPEARED',
              color: 'from-yellow-400 to-amber-500',
              textColor: 'text-yellow-500',
            },
            {
              title: 'STRATEGY',
              status: 'CLARIFIED',
              color: 'from-yellow-400 to-amber-500',
              textColor: 'text-yellow-500',
            },
            {
              title: 'IMPACT',
              status: 'DELIVERED',
              color: 'from-yellow-400 to-amber-500',
              textColor: 'text-yellow-500',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`relative ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} p-8 border-4 ${isDarkMode ? 'border-black' : 'border-white'} overflow-hidden group`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10">
                <h3 className={`text-4xl font-black mb-4 group-hover:text-white transition-colors`}>
                  {item.title}
                </h3>
                <div className={`h-1 ${isDarkMode ? 'bg-black' : 'bg-white'} group-hover:bg-white w-16 mb-4 transition-colors`} />
                <p className={`text-2xl font-black ${item.textColor} group-hover:text-white transition-colors`}>
                  {item.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>
            THE ONLY THING WE LEAVE BEHIND IS
          </p>
          <motion.p
            className="text-5xl md:text-7xl font-black text-yellow-400"
            animate={{
              textShadow: [
                '0 0 20px rgba(250,204,21,0.5)',
                '0 0 40px rgba(250,204,21,0.8)',
                '0 0 20px rgba(250,204,21,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            IMPACT.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
