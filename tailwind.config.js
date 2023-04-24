module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        fs11: "11px",
        fs12: "12px",
        fs13: "13px",
        fs14: "14px",
        fs15: "15px",
        fs18: "18px",
        fs22: "22px",
      },
      colors: {
        primary: "#0A68FF",
        secondary: "#FFE880",
        darkGray: "#808089",
        lightGray: "#999999",
        iconGray: "#a6a6b0",
        whiteGray: "rgb(245, 245, 250)",
        black: "#27272A",
        hotRed: "#FF424E",
        lightGreen: "#00AB56",
        lightBlue: "#70A6FF",
        whiteBlue: "#DBEEFF",
        extraWhiteBlue: "rgb(240, 248, 255)",
      },
      borderColor: {
        primary: "#0A68FF",
      },
      backgroundColor: {
        primary: "#0A68FF",
        content: "#efefef",
        button: "#f5f5f5",
        dash: "#edf4ff",
        lightGray: "#27272a",
        mediumGrey: "#f8f9fa",
        lightPink: "#fff9ed",
        facebook: "#1877f2",
        twitter: "#1d9bf0",
        instagram: "#fe643b",
        linkedin: "#0a66c2",
      },
      height: {
        header: "3.75rem", // Header height - 60px
        sidebar: "calc(100vh - 3.75rem)", // Sidebar height
      },
      spacing: {
        header: "3.75rem", // Header height
        sidebar: "16.25rem", // Sidebar width
      },
      width: {
        sidebar: "16.25rem", // Sidebar width - 260px
      },
    },
  },
  plugins: [],
};
