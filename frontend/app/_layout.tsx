import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "./context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Fallback UI can be added here
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Authentication Screens */}
          <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
          {/* Main Screens */}
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen
            name="page/Ambulance"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="page/Fire"
            options={{ headerShown: true, title: "Fire Emergency" }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          {/* Menu Screens */}
          <Stack.Screen
            name="page/Menu/RegisterNumber"
            options={{
              headerShown: true,
              title: "Register Number",
            }}
          />
          <Stack.Screen
            name="page/Menu/ViewMember"
            options={{
              headerShown: true,
              title: "View Members",
            }}
          />
          <Stack.Screen
            name="page/Menu/DeleteNumber"
            options={{
              headerShown: true,
              title: "Delete Number",
            }}
          />
          <Stack.Screen
            name="page/Menu/EditSoSMessage"
            options={{
              headerShown: true,
              title: "Edit SOS Message",
            }}
          />
          <Stack.Screen
            name="page/Menu/EditTimer"
            options={{
              headerShown: true,
              title: "Edit Timer",
            }}
          />{" "}
          <Stack.Screen
            name="page/Landslide"
            options={{
              headerShown: true,
              title: "Edit Timer",
            }}
          />{" "}
          <Stack.Screen
            name="page/HelpDesk"
            options={{
              headerShown: true,
              title: "Edit Timer",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
