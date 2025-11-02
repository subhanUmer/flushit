import { Video, Camera, Palette, Sparkles, TrendingUp, Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Video,
      title: 'CONTENT PRODUCTION',
      bad: 'Generic Ads',
      good: 'Stories People Watch',
      description: 'Organic-style content that doesn\'t feel like an ad.',
      features: ['Short Films', 'UGC Content', 'Brand Videos', 'Social Media'],
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
    {
      icon: Camera,
      title: 'EVENT COVERAGE',
      bad: 'Boring B-Roll',
      good: 'Captured Energy',
      description: 'Every moment that matters, documented with style.',
      features: ['Live Coverage', 'Highlight Reels', 'Behind Scenes', 'Documentary'],
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
    {
      icon: Palette,
      title: 'BRANDING & DESIGN',
      bad: 'Forgettable Logos',
      good: 'Iconic Identity',
      description: 'Build a brand that actually stands out.',
      features: ['Brand Identity', 'Visual Systems', 'Motion Graphics', 'Direction'],
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
    {
      icon: Sparkles,
      title: 'AI EXPERIMENTATION',
      bad: 'Same Old Content',
      good: 'Future-Ready Creations',
      description: 'Pushing boundaries with cutting-edge tech.',
      features: ['AI Content', 'Automation', 'Innovation Labs', 'Next-Gen Solutions'],
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
  ];

  return (
    <section id="services" ref={containerRef} className="py-32 px-6 relative bg-white text-black overflow-hidden">
      {/* Drifting yellow shapes */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-yellow-400 opacity-15"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-25"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-400 opacity-10"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [0, 90, 180],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-0 left-0 w-full h-3 bg-yellow-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 uppercase leading-none">
            THE WASH
            <br />
            <span className="relative inline-block">
              CYCLE
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-2 bg-yellow-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          <motion.p
            className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-red-500 line-through">IDENTIFY THE CLOG</span>
            {' → '}
            <span className="text-yellow-500">AGITATE</span>
            {' → '}
            <span className="text-green-500">CLARIFY</span>
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-0 border-4 border-black max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`relative ${service.bgColor} ${service.textColor} p-4 border-r-4 border-b-4 border-black last:border-r-0 overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : 0.8,
              }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredIndex === index ? '0%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <service.icon
                  className={`mb-2 ${hoveredIndex === index ? 'text-yellow-400' : ''}`}
                  size={32}
                  strokeWidth={3}
                />

                <h3 className={`text-lg md:text-xl font-black mb-2 ${hoveredIndex === index ? 'text-white' : ''}`}>
                  {service.title}
                </h3>

                <motion.div
                  className="mb-2"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? 'auto' : 0,
                  }}
                >
                  <p className="text-red-400 line-through font-bold text-xs mb-1">{service.bad}</p>
                  <p className="text-yellow-500 font-bold text-sm">↓ {service.good}</p>
                </motion.div>

                <p className={`mb-3 font-semibold text-sm ${hoveredIndex === index ? 'text-gray-300' : ''}`}>
                  {service.description}
                </p>

                <ul className="space-y-1 font-bold text-xs">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className={`flex items-center gap-1 ${hoveredIndex === index ? 'text-white' : ''}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{
                        x: hoveredIndex === index ? 0 : -20,
                        opacity: hoveredIndex === index ? 1 : 1,
                      }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className={hoveredIndex === index ? 'text-yellow-400' : ''}>▸</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-400 text-black px-12 py-6 font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            START YOUR PROJECT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
