import { Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Portfolio() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'STARTUP LAUNCH',
      before: 'No Buzz',
      after: 'Series A Funded',
      category: 'BRAND VIDEO',
      bgColor: 'bg-cyan-400',
      textColor: 'text-black',
    },
    {
      title: 'E-COMMERCE UGC',
      before: '1x Conversion',
      after: '3x Conversion',
      category: 'USER CONTENT',
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
    },
    {
      title: 'PRODUCT STORY',
      before: 'Unknown Product',
      after: 'Viral Success',
      category: 'SHORT FILM',
      bgColor: 'bg-green-400',
      textColor: 'text-black',
    },
    {
      title: 'SOCIAL TAKEOVER',
      before: '10K Followers',
      after: '200K+ Engaged',
      category: 'CONTENT SERIES',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
    {
      title: 'TECH CONFERENCE',
      before: '3-Day Event',
      after: '2-Min Viral Edit',
      category: 'EVENT COVERAGE',
      bgColor: 'bg-pink-500',
      textColor: 'text-white',
    },
    {
      title: 'AI EXPERIMENT',
      before: 'Traditional Content',
      after: 'Boundary-Pushing',
      category: 'INNOVATION',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
    },
  ];

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8">
            <span className="block text-white">BEFORE</span>
            <motion.span
              className="block bg-gradient-to-r from-red-500 via-cyan-400 to-green-400 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              & AFTER
            </motion.span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-300">
            EVERY PROJECT IS A TRANSFORMATION
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-white">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`relative ${project.bgColor} ${project.textColor} aspect-video border-r-4 border-b-4 border-white last:border-r-0 overflow-hidden cursor-pointer group`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : 0.5,
                rotate: isInView ? 0 : -10,
              }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-black/80 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center"
                  animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Play className="text-cyan-400" size={40} fill="currentColor" />
                </motion.div>
              </motion.div>

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <motion.div
                    className="inline-block px-3 py-1 bg-black text-white font-black text-xs mb-4"
                    animate={{
                      rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.category}
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                    {project.title}
                  </h3>
                </div>

                <motion.div
                  className="space-y-2"
                  animate={{
                    y: hoveredIndex === index ? 0 : 20,
                    opacity: hoveredIndex === index ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="line-through font-bold opacity-70">{project.before}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-black">
                    <span>→</span>
                    <span>{project.after}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 p-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-black p-12 text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-white uppercase">
              YOUR PROJECT COULD BE
              <br />
              <span className="text-cyan-400">OUR NEXT MASTERPIECE</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-400 hover:bg-cyan-300 text-black px-12 py-6 font-black text-xl uppercase border-4 border-cyan-400 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all"
            >
              LET'S TALK
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
