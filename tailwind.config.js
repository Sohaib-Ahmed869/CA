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
          primary: "#089C34", //sage green
          secondary: "#142E1D", //bluish gray
          accent: "#142E1D", //dark purple
          "base-100": "#ffffff", //white
          info: "#9ce37d", //bright light green
          warning: "#ff5722", //default (not part of nstp color pallette)
        },
      },
    ],
  },
};
