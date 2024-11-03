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
        azulOscuro: '#2B2D42',
        azulClaro: '#8D99AE',
        azulPastel: '#EDF2F4',
        rosado: '#EE233C',
        rosadoOscuro: '#D90429',
      },
    },
  },
  plugins: [],
};
export default config;
