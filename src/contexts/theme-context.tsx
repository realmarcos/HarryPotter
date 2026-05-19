import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  isDark: boolean; // é tema escuro ou claro
  toggleTheme: () => void; // função para alternar entre os temas (claro/escuro)
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev;
      AsyncStorage.setItem("@isDark", newValue ? "true" : "false");
      return newValue;
    });
  }, []);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("@isDark");
        if (storedTheme) {
          setIsDark(storedTheme === "true");
        }
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
      }
    };
    loadTheme();
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
