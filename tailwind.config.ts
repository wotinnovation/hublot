import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0b0a08",
        coal: "#171410",
        gold: "#c8a35f",
        kinggold: "#b08d57",
        porcelain: "#f3efe6",
        smoke: "#9a938a",
      },
      fontFamily: {
        display: ["Marcellus", "Georgia", "serif"],
        sans: ["Manrope", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["DM Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
    },
  },
  plugins: [],
};
export default config;
