/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Enables class-based dark mode (e.g., <html class="dark">)
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#FFD700",
        dark: "#1A1A1A",
      },

      backdropBlur: {
        xs: "2px",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.primary"),
                textDecoration: "underline",
              },
            },
            h1: { color: theme("colors.gray.900") },
            h2: { color: theme("colors.gray.900") },
            h3: { color: theme("colors.gray.900") },
            h4: { color: theme("colors.gray.900") },
            h5: { color: theme("colors.gray.900") },
            h6: { color: theme("colors.gray.900") },
            strong: { color: theme("colors.gray.900") },
            code: {
              color: theme("colors.primary"),
              backgroundColor: "rgba(255, 215, 0, 0.1)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            pre: {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              color: theme("colors.gray.900"),
              padding: "1rem",
              borderRadius: "0.5rem",
            },
            blockquote: {
              color: theme("colors.gray.700"),
              borderLeftColor: theme("colors.primary"),
            },
            "ul > li::marker": {
              color: theme("colors.primary"),
            },
            "ol > li::marker": {
              color: theme("colors.primary"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                textDecoration: "underline",
              },
            },
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.100") },
            h4: { color: theme("colors.gray.100") },
            h5: { color: theme("colors.gray.100") },
            h6: { color: theme("colors.gray.100") },
            strong: { color: theme("colors.gray.100") },
            code: {
              color: theme("colors.primary"),
              backgroundColor: "rgba(255, 215, 0, 0.1)",
            },
            pre: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              color: "white",
              padding: "1rem",
              borderRadius: "0.5rem",
            },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.primary"),
            },
            "ul > li::marker": {
              color: theme("colors.primary"),
            },
            "ol > li::marker": {
              color: theme("colors.primary"),
            },
          },
        },
      }),
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
