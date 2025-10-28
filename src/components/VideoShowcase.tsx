import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../App';

export default function VideoShowcase() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { isDarkMode } = useTheme();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      ref={containerRef}
      className={`py-32 px-6 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400 opacity-10"
        animate={{
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6"
            animate={{
              rotate: isInView ? [0, -1, 1, -1, 0] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={isDarkMode ? 'text-white' : 'text-black'}>SEE US</span>
            <br />
            <span className="text-yellow-400">IN ACTION</span>
          </motion.h2>
          <motion.p
            className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            WATCH HOW WE FLUSH BAD IDEAS & DELIVER IMPACT
          </motion.p>
        </motion.div>

        {/* Video Container with Funky Border */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.9,
            rotate: isInView ? 0 : -2,
          }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        >
          {/* Funky border wrapper */}
          <div className={`p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500`}>
            <div className={`border-8 ${isDarkMode ? 'border-black' : 'border-white'} relative`}>
              {/* Video element */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/media/video-thumbnail.png"
                >
                  <source src="/media/showcase-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay controls */}
                <div className="absolute inset-0 flex items-center justify-center group">
                  {/* Play/Pause Button */}
                  {!isPlaying && (
                    <motion.button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center border-4 border-black"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(250, 204, 21, 0.7)',
                            '0 0 0 20px rgba(250, 204, 21, 0)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="text-black ml-2" size={40} fill="currentColor" strokeWidth={3} />
                      </motion.div>
                    </motion.button>
                  )}

                  {/* Bottom Controls Bar */}
                  <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm p-4 flex items-center justify-between transform ${isPlaying ? 'translate-y-0' : 'translate-y-full'} transition-transform`}>
                    <motion.button
                      onClick={togglePlay}
                      className={`${isDarkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-yellow-600'} transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? <Pause size={28} strokeWidth={3} /> : <Play size={28} strokeWidth={3} />}
                    </motion.button>

                    <motion.button
                      onClick={toggleMute}
                      className={`${isDarkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-yellow-600'} transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX size={28} strokeWidth={3} /> : <Volume2 size={28} strokeWidth={3} />}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 border-4 border-black"
                animate={{ rotate: isInView ? 360 : 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 border-4 border-black"
                animate={{ rotate: isInView ? -360 : 0 }}
                transition={{ duration: 2, delay: 0.6 }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-400 border-4 border-black"
                animate={{ rotate: isInView ? -360 : 0 }}
                transition={{ duration: 2, delay: 0.7 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-yellow-400 border-4 border-black"
                animate={{ rotate: isInView ? 360 : 0 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Below Video */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 font-black text-xl uppercase border-4 ${isDarkMode ? 'border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]' : 'border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'} transition-all`}
          >
            LET'S CREATE TOGETHER
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
