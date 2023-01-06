/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/market/*.{ts,tsx}",
    "./src/components/market/*.{ts,tsx}",
    "./src/public/market/*.html",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    colors: {
      primary: "#DCDC49",
      secondary: {
        DEFAULT: "#050928",
        900: "#070C42",
        800: "#080D55",
        700: "#1628B5",
      },
    },
    fontFamily: {
      sans: ["ofelia-text", "sans-serif"],
    },
    extend: {
      spacing: {
        default: "14px",
      },
    },
  },
};
