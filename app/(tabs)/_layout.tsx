import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

export default function TabLayout() {
  const { theme, darkMode } = useAppContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderTopWidth: 0,
          height: 100,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 5,
          elevation: 5,
          paddingTop: 10,
        },
        tabBarActiveTintColor: darkMode ? "#598d6a" : theme.headerBackground,
        tabBarInactiveTintColor: darkMode ? "#598d6a" : theme.headerBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
