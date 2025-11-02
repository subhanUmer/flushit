/**
 * VideoShowcase Component
 *
 * This component is now a full-screen video player, acting as the
 * "single source" destination after the hero's "flush" animation.
 * It features overlay controls for play/pause and mute.
 */
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTheme } from "../App";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isDarkMode } = useTheme(); // Kept for controls, though bg is video

  const [isPlaying, setIsPlaying] = useState(false); // Start paused
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
    <section className={`relative h-screen w-screen overflow-hidden bg-black`}>
      {/* Full-screen video element */}
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 z-0 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        loop
        muted={isMuted}
        playsInline
        poster="/media/Oraan-768x432.png" // Poster is good while video loads
        // Auto-play when it's the destination? User preference.
        // For now, click-to-play is better UX.
      >
        <source src="/media/Oraan-Gold-Launch-Final.mp4" type="video/mp4" />
        <source src="/media/5k-in-5-mins-fonts-updated.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay controls */}
      <div className="absolute inset-0 z-10 flex items-center justify-center group">
        {/* Play/Pause Button (Shows when paused) */}
        {!isPlaying && (
          <motion.button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all"
            aria-label="Play Video"
          >
            <motion.div
              className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center border-4 border-black"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(250, 204, 21, 0.7)",
                  "0 0 0 20px rgba(250, 204, 21, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play
                className="text-black ml-2"
                size={40}
                fill="currentColor"
                strokeWidth={3}
              />
            </motion.div>
          </motion.button>
        )}

        {/* Bottom Controls Bar (Shows when playing) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between transition-transform duration-300 ${
            isPlaying ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <motion.button
            onClick={togglePlay}
            className="text-white hover:text-yellow-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={28} strokeWidth={3} />
            ) : (
              <Play size={28} strokeWidth={3} />
            )}
          </motion.button>

          <motion.button
            onClick={toggleMute}
            className="text-white hover:text-yellow-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={28} strokeWidth={3} />
            ) : (
              <Volume2 size={28} strokeWidth={3} />
            )}
          </motion.button>
        </div>

        {/* Click-to-pause overlay (Shows when playing) */}
        {isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full"
            aria-label="Pause Video"
          />
        )}
      </div>
    </section>
  );
}
