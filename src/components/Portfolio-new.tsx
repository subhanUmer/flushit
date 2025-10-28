import { Play, Camera, Video, Sparkles, TrendingUp, Palette } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../App';

export default function Portfolio() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  // Media portfolio - using /media/ path which points to public/media
  const mediaItems = [
    {
      id: 1,
      title: 'ETERNA HEALTH',
      category: 'Corporate Documentary',
      type: 'image',
      thumbnail: '/media/Eterna-Health-768x432.png',
      description: 'Healthcare brand transformation',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      icon: Video,
    },
    {
      id: 2,
      title: 'ORAAN GOLD LAUNCH',
      category: 'Motion Graphics',
      type: 'video',
      thumbnail: '/media/Oraan-768x432.png',
      videoUrl: '/media/Oraan-Gold-Launch-Final.mp4',
      description: 'Empowering women through fintech',
      bgColor: 'bg-yellow-600',
      textColor: 'text-black',
      icon: Sparkles,
    },
    {
      id: 3,
      title: 'WINGOS',
      category: 'Photography',
      type: 'image',
      thumbnail: '/media/Wingos-768x432.png',
      description: 'Food culture energy',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      icon: Camera,
    },
    {
      id: 4,
      title: 'KICKSTART',
      category: 'Testimonials',
      type: 'video',
      thumbnail: '/media/Your-paragraph-text-768x960.png',
      videoUrl: '/media/Kickstart-cups-of-tea.mov',
      description: 'Real startup stories',
      bgColor: 'bg-yellow-500',
      textColor: 'text-black',
      icon: TrendingUp,
    },
    {
      id: 5,
      title: '5K CHALLENGE',
      category: 'Motion Graphics',
      type: 'video',
      thumbnail: '/media/5k-challenge-768x1365.png',
      videoUrl: '/media/5k-in-5-mins-fonts-updated.mp4',
      description: 'Fitness motivation',
      bgColor: 'bg-orange-400',
      textColor: 'text-black',
      icon: Video,
    },
    {
      id: 6,
      title: 'HUMANIZING WORKSPACES',
      category: 'Corporate Documentary',
      type: 'image',
      thumbnail: '/media/Humanizing-Workspaces-768x432.png',
      description: 'Office culture transformation',
      bgColor: 'bg-yellow-600',
      textColor: 'text-black',
      icon: Camera,
    },
    {
      id: 7,
      title: 'B.GUTSY X SAFEPAY',
      category: 'DVC',
      type: 'video',
      thumbnail: '/media/Frame-1597884324-768x1365.png',
      videoUrl: '/media/B.Gutsy-x-SafePay-v6.mp4',
      description: 'Fintech collaboration',
      bgColor: 'bg-amber-400',
      textColor: 'text-black',
      icon: Palette,
    },
    {
      id: 8,
      title: 'FRESH BASKET',
      category: 'DVC',
      type: 'video',
      thumbnail: '/media/Frame-1597884327-768x1365.png',
      videoUrl: '/media/Fresh-Basket-X-Safepay-new-v2.mp4',
      description: 'E-commerce solution',
      bgColor: 'bg-yellow-600',
      textColor: 'text-black',
      icon: Sparkles,
    },
    {
      id: 9,
      title: 'BREAKDANCE',
      category: 'Event Highlights',
      type: 'video',
      thumbnail: '/media/Frame-1597884328-768x1365.png',
      videoUrl: '/media/BreakDance-Reel-3.mp4',
      description: 'Urban culture',
      bgColor: 'bg-orange-500',
      textColor: 'text-black',
      icon: Camera,
    },
    {
      id: 10,
      title: 'KATHAK DANCE',
      category: 'Event Highlights',
      type: 'video',
      thumbnail: '/media/Frame-1597884329-768x1365.png',
      videoUrl: '/media/Kathak-Reel-v2.mp4',
      description: 'Traditional meets modern',
      bgColor: 'bg-amber-600',
      textColor: 'text-black',
      icon: Video,
    },
  ];

  const categories = ['All', 'Motion Graphics', 'Event Highlights', 'DVC', 'Photography', 'Corporate Documentary', 'Testimonials'];

  const filteredItems = activeFilter === 'All' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeFilter);

  return (
    <section
      id="work"
      ref={containerRef}
      className={`py-32 px-6 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8">
            <span className={`block ${isDarkMode ? 'text-white' : 'text-black'}`}>OUR</span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              WORK
            </motion.span>
          </h2>
          <p className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            FUNKY CONTENT THAT CONVERTS
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 font-black text-sm uppercase border-2 transition-all ${
                activeFilter === category
                  ? 'bg-yellow-400 text-black border-yellow-400'
                  : isDarkMode
                    ? 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                    : 'bg-transparent text-black border-black hover:bg-black hover:text-white'
              }`}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Media Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.8,
                  rotate: isInView ? 0 : -5,
                }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
                className={`relative ${item.bgColor} ${item.textColor} aspect-square overflow-hidden cursor-pointer group border-4 ${isDarkMode ? 'border-white' : 'border-black'}`}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedMedia(item)}
              >
                {/* Background Image/Video Thumbnail */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                    backgroundBlendMode: 'multiply'
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                
                {/* Play Button for Videos */}
                {item.type === 'video' && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center"
                      animate={{ 
                        rotate: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <Play className="text-black ml-1" size={24} fill="currentColor" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Content */}
                <div className="relative h-full p-4 flex flex-col justify-between">
                  <div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white font-black text-xs mb-3 rounded-full"
                      animate={{
                        y: hoveredIndex === index ? -5 : 0,
                        rotate: hoveredIndex === index ? [0, 3, -3, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent size={12} />
                      {item.category}
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? -10 : 0,
                      opacity: hoveredIndex === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-black mb-2 leading-tight text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Funky corner decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-yellow-400"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    rotate: hoveredIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Media Modal */}
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-black border-4 border-yellow-400 overflow-hidden"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-xl hover:bg-yellow-300 transition-colors"
              >
                ×
              </button>

              {selectedMedia.type === 'video' ? (
                <video
                  className="w-full h-auto"
                  controls
                  autoPlay
                  poster={selectedMedia.thumbnail}
                >
                  <source src={selectedMedia.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia.thumbnail}
                  alt={selectedMedia.title}
                  className="w-full h-auto"
                />
              )}

              <div className="p-6 bg-gradient-to-r from-yellow-400 to-amber-500">
                <div className="flex items-center gap-3 mb-3">
                  <selectedMedia.icon className="text-black" size={20} />
                  <span className="text-black font-black text-sm uppercase">
                    {selectedMedia.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-black mb-2">
                  {selectedMedia.title}
                </h3>
                <p className="text-black/80 font-medium">
                  {selectedMedia.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 p-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} p-12 text-center`}>
            <h3 className={`text-4xl md:text-5xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'} uppercase`}>
              READY TO CREATE
              <br />
              <span className="text-yellow-400">SOMETHING AMAZING?</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 font-black text-xl uppercase border-4 border-yellow-400 ${isDarkMode ? 'shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'} transition-all`}
            >
              LET'S TALK
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
