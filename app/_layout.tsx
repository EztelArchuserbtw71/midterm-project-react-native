import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AppProvider } from "./contexts/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: "(tabs)",
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#111111",
    border: "#E5E5E5",
    primary: "#7C3AED",
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={LightTheme}>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
