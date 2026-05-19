import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

/**
 * Custom MD3 themes derived from the app green palette:
 *   #027333  primary bright green
 *   #025928  dark green
 *   #094F2B  darker green
 *   #1C402C  very dark forest green
 *   #709C5F  muted light green
 */

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#027333",
    onPrimary: "#FFFFFF",
    primaryContainer: "#AAEDC2",
    onPrimaryContainer: "#002111",
    secondary: "#516352",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D3E8D3",
    onSecondaryContainer: "#0F1F11",
    tertiary: "#709C5F",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#CBEFB5",
    onTertiaryContainer: "#0D2106",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F8FAF4",
    onBackground: "#1A1C1A",
    surface: "#F8FAF4",
    onSurface: "#1A1C1A",
    surfaceVariant: "#DCE5DA",
    onSurfaceVariant: "#404943",
    outline: "#707973",
    outlineVariant: "#C0C9BF",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2F312F",
    inverseOnSurface: "#F0F1EC",
    inversePrimary: "#8ED6A2",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 246, 239)",
      level2: "rgb(232, 241, 233)",
      level3: "rgb(225, 237, 226)",
      level4: "rgb(223, 236, 225)",
      level5: "rgb(218, 232, 220)",
    },
    surfaceDisabled: "rgba(26, 28, 26, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 26, 0.38)",
    backdrop: "rgba(45, 50, 46, 0.4)",
  },
} as const;

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#709C5F",
    onPrimary: "#1C402C",
    primaryContainer: "#025928",
    onPrimaryContainer: "#AAEDC2",
    secondary: "#B0CDB3",
    onSecondary: "#223527",
    secondaryContainer: "#394B3C",
    onSecondaryContainer: "#D3E8D3",
    tertiary: "#A9CCA3",
    onTertiary: "#1A3620",
    tertiaryContainer: "#325122",
    onTertiaryContainer: "#CBEFB5",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#1A1C1A",
    onBackground: "#E2E3DE",
    surface: "#1A1C1A",
    onSurface: "#E2E3DE",
    surfaceVariant: "#404943",
    onSurfaceVariant: "#C0C9BF",
    outline: "#8A938B",
    outlineVariant: "#404943",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#E2E3DE",
    inverseOnSurface: "#2F312F",
    inversePrimary: "#027333",
    elevation: {
      level0: "transparent",
      level1: "rgb(28, 35, 29)",
      level2: "rgb(31, 39, 32)",
      level3: "rgb(34, 44, 36)",
      level4: "rgb(35, 45, 37)",
      level5: "rgb(37, 49, 39)",
    },
    surfaceDisabled: "rgba(226, 227, 222, 0.12)",
    onSurfaceDisabled: "rgba(226, 227, 222, 0.38)",
    backdrop: "rgba(45, 50, 46, 0.4)",
  },
} as const;

export type AppTheme = typeof lightTheme;
