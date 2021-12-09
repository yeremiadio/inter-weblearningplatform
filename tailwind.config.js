module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        whiteboard: "#F8F9FA",
      },
      textColor: {
        primary: "#111d57",
        secondary: "rgba(17,29,87,.7)",
      },
      boxShadow: {
        "default-weblearning": "rgb(0 0 0 / 2%) 0px 3.5px 5.5px",
        "boxShadow-siderbar-main": "rgb(0 0 0 / 15%) -16px 4px 40px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
