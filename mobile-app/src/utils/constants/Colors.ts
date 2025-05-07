/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#2E7D32"; // green
const tintColorDark = "#2E7D32";

const primary = "#2E7D32";

export const Colors = {
  primary,
  light: {
    text: "#11181C",
    color: "#fff",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabBg: "#f9f9f9",
  },
  dark: {
    text: "#ECEDEE",
    color: "#000",
    background: "#000",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tabBg: "#121212",
  },
};

/**
 * eva theme
 * For a custom theme configuration
 * @see https://colors.eva.design/
 */
export const theme = {
  // Green primary color shades
  "color-primary-100": "#D7F4DB",
  "color-primary-200": "#ACE8B9",
  "color-primary-300": "#7AD78F",
  "color-primary-400": "#4CC469",
  "color-primary-500": "#2E7D32", // main green
  "color-primary-600": "#276A2C",
  "color-primary-700": "#205626",
  "color-primary-800": "#194321",
  "color-primary-900": "#14361C",

  // Success (unchanged, already green)
  "color-success-100": "#E3FBD7",
  "color-success-200": "#C2F8B1",
  "color-success-300": "#96EC86",
  "color-success-400": "#6CD964",
  "color-success-500": "#36C138",
  "color-success-600": "#27A534",
  "color-success-700": "#1B8A30",
  "color-success-800": "#116F2B",
  "color-success-900": "#0A5C28",

  // Info (unchanged)
  "color-info-100": "#D9EFFD",
  "color-info-200": "#B3DCFC",
  "color-info-300": "#8CC3F7",
  "color-info-400": "#6EABEF",
  "color-info-500": "#4087E5",
  "color-info-600": "#2E68C4",
  "color-info-700": "#204DA4",
  "color-info-800": "#143684",
  "color-info-900": "#0C256D",

  // Warning (unchanged)
  "color-warning-100": "#FFFBD3",
  "color-warning-200": "#FFF7A6",
  "color-warning-300": "#FFF27A",
  "color-warning-400": "#FFED59",
  "color-warning-500": "#FFE523",
  "color-warning-600": "#DBC219",
  "color-warning-700": "#B79F11",
  "color-warning-800": "#937E0B",
  "color-warning-900": "#7A6706",

  // Danger (unchanged)
  "color-danger-100": "#FFE7D6",
  "color-danger-200": "#FFC9AD",
  "color-danger-300": "#FFA483",
  "color-danger-400": "#FF8165",
  "color-danger-500": "#FF4732",
  "color-danger-600": "#DB2824",
  "color-danger-700": "#B71922",
  "color-danger-800": "#930F22",
  "color-danger-900": "#7A0922",
};
