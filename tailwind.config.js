/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  darkMode: "class",
  content: [
  "./src/**/*.{astro,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        plex: ["var(--font-plex)", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        scp: ["Source Code Pro", "monospace"],
      },
      colors: {
        pink: "#FA00FF",
        primary: "#FEEE16",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require("@catppuccin/tailwindcss")({
    //   prefix: false,
    //   defaultFlavour: "frappe",
    // }),
  ],
};
