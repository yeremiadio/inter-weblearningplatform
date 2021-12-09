module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
