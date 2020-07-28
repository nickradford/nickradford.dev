module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        pink: "#FA00FF",
      },
    },
    typography: {
      default: {
        css: {
          color: "#EDF2F7",
          a: {
            color: "#FA00FF",
          },
          code: {
            color: "#FFF",
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
