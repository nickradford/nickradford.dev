module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["Kalam"],
        scp: ["Source Code Pro", "monospace"],
      },
      colors: {
        pink: "#FA00FF",
        primary: "#FEEE16",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "white",
            maxWidth: "80ch",
            a: {
              color: "#FA00FF",
              background: "#000000",
              padding: "4px 6px",
              borderRadius: 3,
            },
            ul: { paddingLeft: "1em" },
            "li > p": { margin: ".5rem !important" },
            li: {
              margin: 0,
            },
            code: {
              color: "#FFF",
            },
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
