export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        secondarytext: "var(--color-secondarytext)",
        bg: "var(--color-bg)",
      },
       fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};