/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Add Outfit font
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animated"),
    require("flowbite/plugin")({
      datatables: true,
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#009934", //sage green
          secondary: "#181818", //bluish gray
          accent: "#142E1D", //dark purple
          "base-100": "#ffffff", //white
          info: "#9ce37d", //bright light green
          warning: "#ff5722",
        },
      },
    ],
  },
};
