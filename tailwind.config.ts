import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     boxShadow:{
       "primary":"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
     },
     fontFamily:{
      virgil:"Virgil",
      cascadia:"Cascadia"
     }
    },
  },
  plugins: [],
};
export default config;
