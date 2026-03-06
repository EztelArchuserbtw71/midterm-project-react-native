import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../contexts/AppContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import RenderHtml from "react-native-render-html";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const toTitleCase = (text?: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

type JobModalProps = {
  jobUuid: string;
};

export default function JobModal({ jobUuid }: JobModalProps) {
  const {
    theme,
    darkMode,
    jobs,
    saveJob,
    removeJob,
    isJobSaved,
    openApply,
    closeJob,
  } = useAppContext();

  const translateX = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    if (jobUuid) translateX.value = withTiming(0, { duration: 300 });
  }, [jobUuid]);

  if (!jobUuid) return null;
  const job = jobs.find((j) => j.uuid === jobUuid);
  if (!job) return null;

  const saved = isJobSaved(job.uuid);

  const salary =
    job.minSalary && job.maxSalary
      ? job.minSalary === job.maxSalary
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: job.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(job.minSalary)
        : `${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: job.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(job.minSalary)} - ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: job.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(job.maxSalary)}`
      : "No Listed Salary Range";

  const handleClose = () => {
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
      runOnJS(closeJob)();
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => (translateX.value = Math.max(0, e.translationX)))
    .onEnd((e) => {
      const threshold = SCREEN_WIDTH * 0.6;
      const fastSwipe = e.velocityX > 800;

      if (e.translationX > threshold || fastSwipe) {
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(closeJob)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: darkMode ? "#110f1b" : "#fff",
            position: "absolute",
            top: 0,
            left: 0,
          },
          animatedStyle,
        ]}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: theme.headerBackground,
            paddingTop: Platform.OS === "ios" ? 50 : 40,
            paddingBottom: 16,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <TouchableOpacity
            onPress={handleClose}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="chevron-back" size={24} color={theme.headerTitle} />
            <Text
              style={{
                color: theme.headerTitle,
                fontSize: 20,
                fontWeight: "700",
                marginLeft: 6,
              }}
            >
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (saved ? removeJob(job.uuid) : saveJob(job.uuid))}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.headerBackground,
            }}
          >
            <Ionicons
              name={saved ? "bookmark" : "bookmark-outline"}
              size={20}
              color={saved ? theme.primary : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 140,
            marginTop: 20,
            justifyContent: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Job Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Image
              source={{ uri: job.companyLogo }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                marginRight: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: theme.text, fontSize: 20, fontWeight: "700" }}
              >
                {job.title}
              </Text>
              <Text style={{ color: theme.placeholder, fontSize: 14 }}>
                {job.companyName}
              </Text>
              <Text
                style={{
                  color: theme.primary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {salary}
              </Text>
              <Text style={{ color: theme.text, fontSize: 12, marginTop: 4 }}>
                {toTitleCase(job.workModel)} • {toTitleCase(job.jobType)} •{" "}
                {toTitleCase(job.seniorityLevel)}
              </Text>
              {job.locations?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={theme.placeholder}
                  />
                  <Text
                    style={{
                      color: theme.placeholder,
                      fontSize: 12,
                      marginLeft: 4,
                    }}
                  >
                    {job.locations[0]}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {job.description ? (
            <RenderHtml
              contentWidth={SCREEN_WIDTH - 32}
              source={{ html: job.description }}
              baseStyle={{ color: theme.text, fontSize: 14, lineHeight: 20 }}
              tagsStyles={{
                h1: { fontSize: 22, fontWeight: "700", marginVertical: 6 },
                h2: { fontSize: 20, fontWeight: "700", marginVertical: 6 },
                h3: { fontSize: 18, fontWeight: "700", marginVertical: 6 },
                p: { fontSize: 16, marginVertical: 4 },
                li: { fontSize: 14, marginVertical: 2, marginLeft: 16 },
              }}
            />
          ) : (
            <View style={{ marginTop: 40 }}>
              <Text
                style={{ color: theme.text, fontSize: 16, textAlign: "center" }}
              >
                No description provided for this job.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Apply Button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            backgroundColor: theme.alt,
            borderTopWidth: 0.5,
            borderTopColor: darkMode ? "#222" : "#E5E7EB",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.headerBackground,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 0,
              borderColor: theme.primary,
              marginBottom: 10,
            }}
            onPress={() => openApply(job.uuid)}
          >
            <Text
              style={{
                color: theme.headerTitle,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
