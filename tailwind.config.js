module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
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
            background: "#000000",
            padding: "4px 6px",
            borderRadius: 3,
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
