import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { darkTheme, lightTheme } from "@/constants/paper-theme";
import { AppThemeProvider, useAppTheme } from "@/contexts/theme-context";
import { Stack } from "expo-router";

const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
    materialLight: lightTheme,
    materialDark: darkTheme,
  });

function AppLayout() {
  const { isDark } = useAppTheme();
  const paperTheme = isDark ? darkTheme : lightTheme;
  const navTheme = isDark ? NavDarkTheme : NavLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navTheme}>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppLayout />
    </AppThemeProvider>
  );
}
