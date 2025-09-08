// tailwind.config.cjs
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // in case
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ecoBeige: "#F3EADB",
        ecoGreen: "#0F8A3B",
        ecoDark: "#0B1420",
        "eco-muted": "#6D7A7D",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
