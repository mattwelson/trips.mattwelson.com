import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  scaleRatio: 2.5,
  headerFontFamily: [
    "Rubik",
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: ["Lato", "Georgia", "serif"],
  googleFonts: [
    {
      name: "Rubik",
      styles: ["700"]
    },
    {
      name: "Lato",
      styles: ["400"]
    }
  ]
});

export default typography;
