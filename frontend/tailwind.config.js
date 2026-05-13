/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005bbf",
        "primary-dark": "#004a9e",
        accent: "#d83900",
        ink: "#191c23",
        muted: "#727785",
        line: "#ecedf7",
        soft: "#f2f3fd",
        page: "#f9f9ff",
      },
      maxWidth: {
        app: "1280px",
      },
      boxShadow: {
        soft: "0 14px 34px rgba(25, 28, 35, 0.08)",
      },
    },
  },
  plugins: [],
};
