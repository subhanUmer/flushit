/**
 * Hero Component with a dynamic canvas background.
 *
 * The background features an "Image Tornado Effect" rendered on an HTML canvas,
 * which activates on scroll.
 * This version loads specific image files from the /media/ directory,
 * adds yellow borders to floating images, increases particle count,
 * and implements a "splash" effect (now larger spread) when particles condense.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// List of images to load for the particles (expanded)
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

export default function Hero() {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsAnimationActive(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isAnimationActive) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let ctx = gsap.context(() => {
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
            console.warn(`Could not load particle image: ${path}`);
            if (loadedCount === particleImagePaths.length) {
              imagesFullyLoaded = true;
            }
          };
        });
      }

      loadParticleImages();

      const condenseProgress = { value: 0 };
      let splashTriggered = false;

      ScrollTrigger.create({
        trigger: componentRef.current,
        start: "bottom bottom",
        end: "+=50%",
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.to(condenseProgress, {
            value: self.progress,
            overwrite: true,
            ease: "power1.in",
          });

          if (self.progress > 0.8 && !splashTriggered) {
            triggerSplash();
            splashTriggered = true;
          }
          if (self.progress < 0.8) {
            splashTriggered = false;
          }
        },
      });

      let animationFrameId: number;

      function init() {
        handleResize();
        animationFrameId = window.requestAnimationFrame(render);
      }

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);

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

        update() {
          this.currRadius -= this.vSpeed;
          this.currAngle += this.rSpeed;
          this.rotation += this.rotationSpeed;
          this.position.y += this.vSpeed;
          this.position.x = Math.cos(this.currAngle) * this.currRadius;
          this.position.z =
            centerZ + Math.sin(this.currAngle) * this.currRadius;
          let canvasRatio = this.canvas.width * 0.9,
            xOffset = this.canvas.width / 2,
            yOffset = this.canvas.height / 2;
          this.scale = canvasRatio / (canvasRatio + this.position.z);

          this.width3D = this.size * this.scale;
          this.height3D = this.width3D * this.aspectRatio;

          this.x3D = xOffset + this.position.x * this.scale;
          this.y3D = yOffset + this.position.y * this.scale;

          if (condenseProgress.value > 0) {
            if (this.originalScale === 0) {
              this.originalX3D = this.x3D;
              this.originalY3D = this.y3D;
              this.originalScale = this.scale;
            }
            const targetX = this.canvas.width / 2;
            const targetY = this.canvas.height * 1.2;
            const targetScale = 0;

            this.x3D = gsap.utils.interpolate(
              this.originalX3D,
              targetX,
              condenseProgress.value
            );
            this.y3D = gsap.utils.interpolate(
              this.originalY3D,
              targetY,
              condenseProgress.value
            );
            this.scale = gsap.utils.interpolate(
              this.originalScale,
              targetScale,
              condenseProgress.value
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
          const alpha =
            this.originalScale === 0
              ? Math.min(1, this.scale * 1.5)
              : 1 - condenseProgress.value;
          this.context.globalAlpha = Math.max(0, alpha);
          this.context.drawImage(
            this.image,
            -this.width3D / 2,
            -this.height3D / 2,
            this.width3D,
            this.height3D
          );

          this.context.strokeStyle = "yellow";
          this.context.lineWidth = 2;
          this.context.strokeRect(
            -this.width3D / 2,
            -this.height3D / 2,
            this.width3D,
            this.height3D
          );

          this.context.restore();
        }

        getRandomInt(min: number, max: number) {
          return min + Math.random() * (max - min);
        }

        isDead() {
          const naturallyDead =
            this.y3D > this.canvas.height * 1.5 || this.currRadius < 10;
          return naturallyDead && condenseProgress.value === 0;
        }
      }

      // --- SPLASH PARTICLE LOGIC ---
      const splashParticles: {
        x: number;
        y: number;
        radius: number;
        alpha: number;
        speed: number;
      }[] = [];

      function triggerSplash() {
        const splashCount = 60;
        const splashOriginX = canvas.width / 2;
        const splashOriginY = canvas.height * 0.9;

        for (let i = 0; i < splashCount; i++) {
          splashParticles.push({
            // --- MODIFIED: Increased horizontal spread significantly ---
            x: splashOriginX + (Math.random() - 0.5) * 200, // Increased from 100
            // --- MODIFIED: Increased vertical spread significantly ---
            y: splashOriginY + (Math.random() - 0.5) * 80, // Increased from 40
            radius: Math.random() * 8 + 3,
            alpha: 1,
            speed: Math.random() * 0.8 + 0.4,
          });
        }
      }

      function updateSplash() {
        for (let i = splashParticles.length - 1; i >= 0; i--) {
          const p = splashParticles[i];
          p.radius += p.speed;
          p.alpha -= 0.02;
          if (p.alpha <= 0) {
            splashParticles.splice(i, 1);
          }
        }
      }

      function drawSplash() {
        splashParticles.forEach((p) => {
          context.beginPath();
          context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 255, 0, ${p.alpha})`;
          context.fill();
        });
      }
      // --- END SPLASH PARTICLE LOGIC ---

      function createParticles() {
        if (
          condenseProgress.value > 0 ||
          !imagesFullyLoaded ||
          particleImages.length === 0
        )
          return;

        particles.push(
          new Particle(
            canvas,
            context,
            new Vector3(canvas.width / 2, -canvas.height / 2, 0)
          )
        );
      }

      function clearCanvas() {
        context.fillStyle = isDarkMode ? "black" : "white";
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
        if (particles.length < particleCount) createParticles();
        updateSplash();
      }

      function render() {
        currentTime = new Date().getTime();
        delta = currentTime - lastTime;
        if (delta > interval) {
          update();
          clearCanvas();
          for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.draw();
          }
          drawSplash();
          lastTime = currentTime - (delta % interval);
        }
        animationFrameId = requestAnimationFrame(render);
      }

      init();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.cancelAnimationFrame(animationFrameId);
        particles.length = 0;
        particleImages.length = 0;
        splashParticles.length = 0;
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, componentRef);

    return () => ctx.revert();
  }, [isAnimationActive, isDarkMode]);

  return (
    <section
      id="home"
      ref={componentRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      {/* 1. Canvas Background */}
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: isDarkMode ? "black" : "white",
        }}
      />

      {/* 2. Static Foreground Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none uppercase">
            <span
              className={`block ${isDarkMode ? "text-white" : "text-black"}`}
            >
              FLUSH
            </span>
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              THE BAD
            </span>
          </h1>
          <div className="mb-12">
            <p
              className={`text-2xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              } mb-4`}
            >
              WE DON'T BRAINSTORM.
            </p>
            <p className="text-3xl md:text-5xl font-black text-yellow-400">
              WE DETOX.
            </p>
          </div>
          <p
            className={`text-xl md:text-2xl ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } mb-12 max-w-4xl mx-auto`}
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
              className="group bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 rounded-none font-black text-xl transition-all flex items-center gap-3 uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
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

      {/* Bottom fade-out gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
          isDarkMode ? "from-black" : "from-white"
        } to-transparent`}
      />
    </section>
  );
}
