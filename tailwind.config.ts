import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //Paleta colores:  https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c-d90429
      colors: {
        background: "#F2F2F2",
        foreground: "#D9D9D9",
        navbar: "#2B2D42",
        navbar_hover: "#8D99AE",
        button_hover: "#EF233C"
      },
    },
  },
  plugins: [],
};
export default config;
