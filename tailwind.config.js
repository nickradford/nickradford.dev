module.exports = {
  purge: [],
  theme: {
    extend: {},
    typography: {
      default: {
        css: {
          color: "#EDF2F7",
          a: {
            color: "#FA00FF",
          },
        },
      },
    },
  },
  variants: {
    margin: ["responsive", "last"],
  },
  plugins: [require("@tailwindcss/typography")],
};
