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
    sm: "0.25rem",
    base: "0.25rem",
    md: "0.25rem",
  },
});
