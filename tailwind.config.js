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
    display: ["responsive", "group-hover"],
  },
  plugins: [require("@tailwindcss/typography")],
};
