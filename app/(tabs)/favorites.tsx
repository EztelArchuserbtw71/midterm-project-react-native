import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../contexts/AppContext";
import JobCard from "../components/JobCard/JobCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteScreen() {
  const navigation = useNavigation<any>();
  const { theme, darkMode, toggleDarkMode, jobs, savedJobUUIDs, loadingJobs } =
    useAppContext();
  const [query, setQuery] = useState("");

  const filteredJobs = jobs
    .filter((job) => savedJobUUIDs.includes(job.uuid))
    .filter((job) => job.title.toLowerCase().includes(query.toLowerCase()));

  const [statusBarStyle, setStatusBarStyle] = useState<
    "default" | "light-content" | "dark-content"
  >(darkMode ? "dark-content" : "light-content");

  useEffect(() => {
    setStatusBarStyle(darkMode ? "light-content" : "dark-content");
  }, [darkMode]);

  const renderEmptyState = ({
    icon,
    title,
    message,
    buttonLabel,
    onPressButton,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    message: string;
    buttonLabel?: string;
    onPressButton?: () => void;
  }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -120,
        paddingHorizontal: 30,
      }}
    >
      <Ionicons
        name={icon}
        size={70}
        color={theme.primary}
        style={{ marginBottom: 20 }}
      />
      <Text
        style={{
          color: theme.text,
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: theme.placeholder,
          textAlign: "center",
          marginBottom: buttonLabel ? 30 : 0,
        }}
      >
        {message}
      </Text>
      {buttonLabel && onPressButton && (
        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 12,
          }}
          onPress={onPressButton}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background }}
      edges={["top"]}
    >
      <StatusBar
        animated
        translucent={Platform.OS === "ios"}
        backgroundColor={theme.headerBackground}
        barStyle={statusBarStyle}
      />

      <View
        style={{
          backgroundColor: theme.headerBackground,
          paddingTop: 50,
          marginTop: -50,
          paddingHorizontal: 8,
          paddingBottom: 8,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: theme.headerTitle,
              flex: 1,
              marginLeft: 10,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Favorites
          </Text>

          <TouchableOpacity
            onPress={toggleDarkMode}
            style={{
              padding: 10,
              borderRadius: 12,
              marginRight: 10,
              marginBottom: -3,
              backgroundColor: theme.headerBackground,
            }}
          >
            {darkMode ? (
              <Feather name="sun" size={20} color="#ffffff" />
            ) : (
              <Feather name="moon" size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>

        <SearchBar value={query} onChange={setQuery} />
      </View>

      {loadingJobs ? (
        renderEmptyState({
          icon: "time-outline",
          title: "Loading Jobs",
          message: "Please wait while we fetch your saved jobs.",
        })
      ) : filteredJobs.length === 0 ? (
        renderEmptyState({
          icon: "heart-outline",
          title: "No Saved Jobs",
          message: "You haven’t saved any jobs yet.",
          buttonLabel: "",
        })
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => <JobCard job={item} />}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 30,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
