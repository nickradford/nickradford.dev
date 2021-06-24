const TYPOGRAPHY = {
  css: {
    color: "white",
    maxWidth: "80ch",
    a: {
      color: "#FEEE16",
      // background: "#000000",
      fontFamily: "Source Code Pro",
      // padding: "4px 6px",
      borderRadius: 3,
    },
    strong: {
      color: "white",
      textDecoration: "underline",
    },
    code: {
      fontFamily: "Source Code Pro",
      color: "white",
    },
    ul: { paddingLeft: "1em" },
    "li > p": { margin: ".5rem !important" },
    li: {
      margin: 0,
    },
  },
};

module.exports = {
  mode: "jit",
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
        DEFAULT: TYPOGRAPHY,
        lg: TYPOGRAPHY,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
