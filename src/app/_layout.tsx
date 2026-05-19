import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { darkTheme, lightTheme } from "@/constants/paper-theme";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { AppThemeProvider, useAppTheme } from "@/contexts/theme-context";

const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
    materialLight: lightTheme,
    materialDark: darkTheme,
  });

function AppLayout() {
  const { isDark } = useAppTheme();
  const { session, isLoading } = useAuth();
  const router = useRouter();

  const paperTheme = isDark ? darkTheme : lightTheme;
  const navTheme = isDark ? NavDarkTheme : NavLightTheme;

  useEffect(() => {
    if (isLoading) return;
    if (session) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [session, isLoading, router]);

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
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </AppThemeProvider>
  );
}
