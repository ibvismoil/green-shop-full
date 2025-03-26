/** @type {import('tailwindcss').Config} */
export default {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
              xs: "420px",
              sm: "640px",
              md: "768px",
              lg: "1024px",
              xl: "1280px",
              "2xl": "1536px",
            },
            colors: {
              primary: "#3BB77E",
              secondary: "#28A745",
            },
          },
    },
    plugins: [],
  };