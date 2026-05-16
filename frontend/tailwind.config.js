/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary-dark": "#1d4ed8",
        accent: "#f97316",
        mint: "#14b8a6",
        berry: "#7c3aed",
        ink: "#101828",
        muted: "#667085",
        line: "#d8dee9",
        soft: "#eef6ff",
        page: "#f7fafc",
      },
      maxWidth: {
        app: "1280px",
      },
      boxShadow: {
        soft: "0 14px 34px rgba(25, 28, 35, 0.08)",
        glow: "0 24px 80px rgba(37, 99, 235, 0.18)",
        card: "0 18px 45px rgba(16, 24, 40, 0.10)",
      },
    },
  },
  plugins: [],
};
