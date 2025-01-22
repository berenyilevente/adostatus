import type { Config } from "tailwindcss";
import daisyui from "daisyui";

import { daisyUIConfig } from "./src/config/daisyui.config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "11px",
        sm: "13px",
        base: "15px",
      },
      container: {
        center: true,
      },
    },
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
  },
  daisyui: daisyUIConfig(),
  plugins: [daisyui],
};
export default config;
