import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

export type ThemeMode = "light" | "dark";

interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  headerBackground: string;
  headerText: string;
  inputBackground: string;
  buttonBackground: string;
  buttonText: string;
  fabBackground: string;
  fabIcon: string;
  deleteIcon: string;
}

interface ThemeContextInterface {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const lightColors: ThemeColors = {
  primary: "#305f72",
  background: "#ffffff",
  card: "#f5f5f5",
  text: "#000000",
  textSecondary: "#666666",
  border: "#e0e0e0",
  error: "#d32f2f",
  success: "#388e3c",
  headerBackground: "#305f72",
  headerText: "#ffffff",
  inputBackground: "#ffffff",
  buttonBackground: "#305f72",
  buttonText: "#ffffff",
  fabBackground: "#305f72",
  fabIcon: "#ffffff",
  deleteIcon: "#ffffff",
};

const darkColors: ThemeColors = {
  primary: "#4a8fa0",
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#333333",
  error: "#ef5350",
  success: "#66bb6a",
  headerBackground: "#1e1e1e",
  headerText: "#ffffff",
  inputBackground: "#2a2a2a",
  buttonBackground: "#4a8fa0",
  buttonText: "#ffffff",
  fabBackground: "#4a8fa0",
  fabIcon: "#ffffff",
  deleteIcon: "#ffffff",
};

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeContextProvider = (props: ProviderProps) => {
  const { children } = props;
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme as ThemeMode);
      } else {
        // Use system preference if no saved theme
        setTheme(systemColorScheme === "dark" ? "dark" : "light");
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  const colors = theme === "light" ? lightColors : darkColors;

  const paperTheme = theme === "light" ? MD3LightTheme : MD3DarkTheme;

  const customPaperTheme = {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      primary: colors.primary,
      background: colors.background,
      surface: colors.card,
      text: colors.text,
      onSurface: colors.text,
      outline: colors.border,
    },
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <PaperProvider theme={customPaperTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
