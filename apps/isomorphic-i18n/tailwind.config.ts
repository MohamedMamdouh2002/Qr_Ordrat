import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content" | "theme" |"plugins"> = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainColor:"#f97316",
        mainColorHover:"#c96722"
      },

    }
  },
  
  presets: [sharedConfig],
  plugins: [
    require('tailwind-scrollbar-hide'),
    // باقي الإضافات
  ],
};

export default config;
