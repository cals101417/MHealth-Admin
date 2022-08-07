module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundimg: "url('/public/img/bg.png')",
      },
      colors: {
        "header-color": "#21094E",
        "sidebar-color": "#4CA1A3",
        "hover-color": "#4CA1A3",
        "purple-color": "#511281",
      },
      height: {
        127: "200px",
        128: "620px",
        129: "850px",
        130: "500px",
        131: "715px",
      },
      width: {
        111: "200px",
        112: "620px",
        113: "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
