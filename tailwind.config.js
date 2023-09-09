/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          lighter: "#105277",
          DEFAULT: "#19455D",
          darker: "#00314C",
        },
        blue: {
          lighter: "#BAE7FF",
        },
        grey: {
          lighter: "#47474717",
        },
        iceberg: {
          lighter: "#99AFC3",
          DEFAULT: "#73AFD0",
        },
        green: {
          lighter: "#55934b21",
          DEFAULT: "#55934B",
        },
        raspberry: {
          lighter: "#d0323936",
          DEFAULT: "#D03239",
          darker: "#D54B52",
        },
        modal: {
          DEFAULT: "#8c8c8c33",
          darker: "#00000080",
        },
      },
      spacing: {
        2.5: "0.625rem",
        10.5: "2.625rem",
        11.5: "2.875rem",
        12: "3rem",
        12.5: "3.125rem",
        40: "10rem",
        42: "10.5rem",
        45: "11.25rem",
        50: "12.5rem",
        51.25: "12.8175rem",
        56.25: "14.0625rem",
        62.5: "15.625rem",
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
        "2/5": "40%",
        "1/2": "50%",
        "9/10": "90%",
      },
      lineHeight: {
        12: "3rem",
      },
    },
  },
  plugins: [],
};
