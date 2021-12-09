import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
const tailwind = resolveConfig(tailwindConfig);
chakraTheme.colors = tailwind.theme.colors;

export const themeProvider = extendTheme({
  components: { Button: { baseStyle: { _focus: { boxShadow: "none" } } } },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    ...chakraTheme.colors,
    green: {
      ...chakraTheme.colors.green,
    },
    red: {
      ...chakraTheme.colors.red,
    },
    blue: {
      ...chakraTheme.colors.blue,
    },
  },
  radii: {
    none: "0",
    sm: "0.3rem",
    base: "0.3rem",
    md: "0.3rem",
    lg: "0.3rem",
    xl: "0.3rem",
    "2xl": "0.3rem",
    "3xl": "0.3rem",
    full: "0.3rem",
  },
});
