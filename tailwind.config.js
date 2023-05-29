/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#19455D",
        },
        blue: {
          lighter: "#BAE7FF",
        },
        grey: {
          lighter: "#47474717",
        },
      },
      spacing: {
        12.5: "3.125rem",
        40: "10rem",
        42: "10.5rem",
        50: "12.5rem",
        51.25: "12.8175rem",
        56.25: "14.0625rem",
        75: "18.75rem",
        90: "22.5rem",
        100: "25rem",
        126: "31.5rem",
        175: "43.75rem",
        200: "50rem",
        "1/20": "5%",
        "1/10": "10%",
        "1/8": "12.5%",
        "9/20": "45%",
        "11/20": "55%",
        "1/5": "20%",
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
