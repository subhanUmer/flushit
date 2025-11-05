import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
// import { useTheme } from "../App"; // Removed
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Define props type
type Props = {
  isGsapLoaded: boolean;
};

// ... (particleImagePaths list is unchanged) ...
const particleImagePaths = [
  "/media/5k-challenge.png",
  "/media/5k-challenge-576x1024.png",
  "/media/5k-challenge-600x1067.png",
  "/media/Frame-1597884324.png",
  "/media/Frame-1597884327.png",
  "/media/Frame-1597884328.png",
  "/media/Frame-1597884329.png",
  "/media/thumbnail-temp.png",
  "/media/Your-paragraph-text.png",
  "/media/Eterna-Health.png",
  "/media/Humanizing-Workspaces.png",
  "/media/Oraan.png",
  "/media/Wingos.png",
  "/media/Oraan-case-study-2.png",
];

// Accept the prop
export default function HeroShowcase({ isGsapLoaded }: Props) {
  // All theme logic removed
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const condenseProgress = useRef({ value: 0 });

  // --- 1. Canvas Animation Logic (The Tornado) ---
  useEffect(() => {
    // ... (This entire useEffect is unchanged as it doesn't use GSAP) ...
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let fps = 60,
      interval = 1000 / fps,
      lastTime = new Date().getTime(),
      currentTime = 0,
      delta = 0;

    const particles: any[] = [],
      particleCount = 60,
      particleImageSize = 150,
      particleVerticalSpeedMin = 3,
      particleVerticalSpeedMax = 4,
      particleRotationSpeedMin = 0.08,
      particleRotationSpeedMax = 0.12,
      initialRadius = 80,
      centerZ = 1200;

    const particleImages: HTMLImageElement[] = [];
    let imagesFullyLoaded = false;

    function loadParticleImages() {
      let loadedCount = 0;
      if (particleImagePaths.length === 0) {
        imagesFullyLoaded = true;
        return;
      }
      particleImagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loadedCount++;
          particleImages.push(img);
          if (loadedCount === particleImagePaths.length) {
            imagesFullyLoaded = true;
          }
        };
        img.onerror = () => {
          loadedCount++;
          console.error(
            `[HeroShowcase] Failed to load particle image: ${path}. Make sure the 'media' folder is inside the 'public' folder.`
          );
          if (loadedCount === particleImagePaths.length) {
            imagesFullyLoaded = true;
          }
        };
      });
    }
    loadParticleImages();

    let animationFrameId: number;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Vector3 {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    class Particle {
      canvas: any;
      context: any;
      position: any;
      size: any;
      image: any;
      scale: any;
      x3D: any;
      y3D: any;
      width3D: any;
      height3D: any;
      currAngle: any;
      currRadius: any;
      rSpeed: any;
      vSpeed: any;
      rotation: any;
      rotationSpeed: any;
      originalX3D: number;
      originalY3D: number;
      originalScale: number;
      aspectRatio: number;

      constructor(canvas: any, context: any, position: any) {
        this.canvas = canvas;
        this.context = context;
        this.position = position;
        this.image =
          particleImages[Math.floor(Math.random() * particleImages.length)];
        this.size = particleImageSize;
        this.aspectRatio =
          this.image &&
          this.image.naturalHeight > 0 &&
          this.image.naturalWidth > 0
            ? this.image.naturalHeight / this.image.naturalWidth
            : 16 / 9;
        this.scale = 0;
        this.x3D = 0;
        this.y3D = 0;
        this.width3D = 0;
        this.height3D = 0;
        this.currAngle = Math.random() * Math.PI * 2;
        this.currRadius = initialRadius + 800;
        this.rSpeed = this.getRandomInt(
          particleRotationSpeedMin,
          particleRotationSpeedMax
        );
        this.vSpeed = this.getRandomInt(
          particleVerticalSpeedMin,
          particleVerticalSpeedMax
        );
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.originalX3D = 0;
        this.originalY3D = 0;
        this.originalScale = 0;
      }

      getRandomInt(min: number, max: number) {
        return min + Math.random() * (max - min);
      }
      isDead() {
        const naturallyDead =
          this.y3D > this.canvas.height * 1.5 || this.currRadius < 10;
        return naturallyDead && condenseProgress.current.value === 0;
      }

      update() {
        this.currRadius -= this.vSpeed;
        this.currAngle += this.rSpeed;
        this.rotation += this.rotationSpeed;
        this.position.y += this.vSpeed;
        this.position.x = Math.cos(this.currAngle) * this.currRadius;
        this.position.z = centerZ + Math.sin(this.currAngle) * this.currRadius;
        let canvasRatio = this.canvas.width * 0.9,
          xOffset = this.canvas.width / 2,
          yOffset = this.canvas.height / 2;
        this.scale = canvasRatio / (canvasRatio + this.position.z);
        this.width3D = this.size * this.scale;
        this.height3D = this.width3D * this.aspectRatio;
        this.x3D = xOffset + this.position.x * this.scale;
        this.y3D = yOffset + this.position.y * this.scale;

        if (condenseProgress.current.value > 0) {
          if (this.originalScale === 0) {
            this.originalX3D = this.x3D;
            this.originalY3D = this.y3D;
            this.originalScale = this.scale;
          }
          const targetX = this.canvas.width / 2;
          const targetY = this.canvas.height / 2;
          const targetScale = 0;
          this.rSpeed += condenseProgress.current.value * 0.005;
          this.x3D = gsap.utils.interpolate(
            this.originalX3D,
            targetX,
            condenseProgress.current.value
          );
          this.y3D = gsap.utils.interpolate(
            this.originalY3D,
            targetY,
            condenseProgress.current.value
          );
          this.scale = gsap.utils.interpolate(
            this.originalScale,
            targetScale,
            condenseProgress.current.value
          );
          this.width3D = this.size * this.scale;
          this.height3D = this.width3D * this.aspectRatio;
        } else {
          this.originalScale = 0;
        }
      }

      draw() {
        if (
          !imagesFullyLoaded ||
          !this.image ||
          this.image.naturalHeight === 0 ||
          this.scale <= 0.01
        )
          return;
        this.context.save();
        this.context.translate(this.x3D, this.y3D);
        this.context.rotate(this.rotation);
        this.context.globalAlpha = 1;
        this.context.drawImage(
          this.image,
          -this.width3D / 2,
          -this.height3D / 2,
          this.width3D,
          this.height3D
        );
        this.context.restore();
      }
    }

    function createParticles() {
      if (!imagesFullyLoaded || particleImages.length === 0) return;
      particles.push(
        new Particle(
          canvas,
          context,
          new Vector3(canvas.width / 2, -canvas.height / 2, 0)
        )
      );
    }

    function clearCanvas() {
      context.fillStyle = "white"; // Hard-coded
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    function update() {
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        if (p.isDead()) {
          particles.splice(i, 1);
        } else {
          p.update();
        }
      }
      if (particles.length < particleCount) {
        createParticles();
      }
    }

    function render() {
      currentTime = new Date().getTime();
      delta = currentTime - lastTime;
      if (delta > interval) {
        update();
        clearCanvas();
        for (let i = 0; i < particles.length; i++) {
          particles[i].draw();
        }
        lastTime = currentTime - (delta % interval);
      }
      animationFrameId = requestAnimationFrame(render);
    }

    handleResize();
    animationFrameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      particles.length = 0;
      particleImages.length = 0;
    };
  }, []); // This useEffect is fine, no GSAP.

  // --- 2. GSAP "Shrink to Reveal" Animation ---
  useEffect(() => {
    // --- THIS IS THE FIX ---
    // Only run this effect if isGsapLoaded is true
    if (!isGsapLoaded) return;

    const component = componentRef.current;
    const content = contentRef.current;
    const videoWrapper = videoWrapperRef.current;
    const canvas = canvasRef.current;

    if (
      !component ||
      !content ||
      !videoWrapper ||
      !condenseProgress.current ||
      !canvas
    )
      return;

    gsap.set(videoWrapper, { opacity: 1 });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "+=300vh",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        content,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        condenseProgress.current,
        {
          value: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        0.2
      );
      tl.to(
        canvas,
        {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power2.inOut",
        },
        0.5
      );
    }, component);

    return () => ctx.revert();
  }, [isGsapLoaded]); // <-- Add isGsapLoaded to dependency array

  // --- 3. Video Player Logic (Unchanged) ---
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  // ... (rest of video logic is unchanged) ...
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const onVideoError = (e: any) => {
    console.error(
      "Video Error: Failed to load video. Check path and `public` folder.",
      e.target.error.message
    );
  };

  useEffect(() => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch((error) => {
        console.warn("Video autoPlay was prevented by the browser:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <section id="home" ref={componentRef} className="relative h-screen">
      <div className="relative h-full w-full overflow-hidden">
        {/* --- LAYER 1: The Video Player (z-10, Bottom) --- */}
        <div ref={videoWrapperRef} className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            loop
            muted={isMuted}
            playsInline
            autoPlay
            onError={onVideoError}
            poster="/media/Oraan-768x432.png"
          >
            <source src="/media/Oraan-Gold-Launch-Final.mp4" type="video/mp4" />
            <source
              src="/media/5k-in-5-mins-fonts-updated.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls */}
          <div className="absolute inset-0 z-50 flex items-center justify-center group">
            {!isPlaying && (
              <motion.button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all"
                aria-label="Play Video"
              >
                <motion.div
                  className="bg-brand-yellow w-24 h-24 rounded-full flex items-center justify-center border-4 border-black"
                  animate={{ scale: [1, 1.1, 1] }}
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
            <div
              className={`absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between transition-transform duration-300 ${
                isPlaying ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <motion.button
                onClick={togglePlay}
                className="text-white hover:text-brand-yellow transition-colors"
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
                className="text-white hover:text-brand-yellow transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX size={28} strokeWidth={3} />
                ) : (
                  <Volume2 size={28} strokeWidth={3} />
                )}
              </motion.button>
            </div>
            {isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full"
                aria-label="Pause Video"
              />
            )}
          </div>
        </div>

        {/* --- LAYER 2: The Canvas (z-20, Middle "Curtain") --- */}
        <canvas
          ref={canvasRef}
          id="canvas"
          className="absolute inset-0 z-20"
          style={{
            width: "100%",
            height: "100%",
            background: "white",
            clipPath: "circle(150% at 50% 50%)",
          }}
        />

        {/* --- LAYER 3: The Hero Text (z-30, Top) --- */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-30 flex items-center justify-center text-center px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none uppercase">
                <span className={`block text-black`}>FLUSH</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  THE BAD
                </span>
              </h1>
              <div className="mb-12">
                <p className={`text-2xl md:text-4xl font-bold text-black mb-4`}>
                  WE DON'T BRAINSTORM.
                </p>
                <p className="text-3xl md:text-5xl font-black text-brand-yellow">
                  WE DETOX.
                </p>
              </div>
              <p
                className={`text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto`}
              >
                Stop swimming in bad ideas. Start making a splash.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group bg-brand-yellow hover:bg-yellow-300 text-black px-12 py-6 rounded-none font-black text-xl transition-all flex items-center gap-3 uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                >
                  CLEAR THE PIPE
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform"
                    size={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
