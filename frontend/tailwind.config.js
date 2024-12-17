module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scrollbar: "#4B5563",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
