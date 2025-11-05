/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ['"Archivo Black"', "sans-serif"],
      },
      colors: {
        brand: {
          yellow: "#facc15",
          white: "#F5F5F5",
          "pale-gray": "#D3D3D3",
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      // --- NEW: Added dot-pattern background image ---
      backgroundImage: {
        "dot-pattern": "radial-gradient(var(--dot-color) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
