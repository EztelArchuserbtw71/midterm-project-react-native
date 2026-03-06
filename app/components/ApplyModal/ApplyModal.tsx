import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../contexts/AppContext";
import { styles } from "./styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

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

type ApplyModalProps = {
  jobUuid: string;
};

export default function ApplyModal({ jobUuid }: ApplyModalProps) {
  const { theme, darkMode, jobs, closeApply } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [whyHire, setWhyHire] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const translateX = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    if (jobUuid) translateX.value = withTiming(0, { duration: 300 });
  }, [jobUuid]);

  if (!jobUuid) return null;

  const job = jobs.find((j: any) => j.uuid === jobUuid);
  if (!job) return null;

  const handleClose = () => {
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
      runOnJS(closeApply)();
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => (translateX.value = Math.max(0, e.translationX)))
    .onEnd((e) => {
      if (e.translationX > SCREEN_WIDTH * 0.35) {
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(closeApply)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateContact = (contact: string) => /^[0-9+\-() ]+$/.test(contact);

  const handleSubmit = () => {
    if (!name.trim()) return alert("Enter your name");
    if (!validateEmail(email)) return alert("Enter a valid email");
    if (!validateContact(contact)) return alert("Enter valid contact number");
    if (whyHire.trim().length < 10)
      return alert("Tell us why we should hire you");

    setSubmitted(true);
  };

  const salary =
    job.minSalary && job.maxSalary
      ? job.minSalary === job.maxSalary
        ? `${job.currency} ${job.minSalary}`
        : `${job.currency} ${job.minSalary} - ${job.currency} ${job.maxSalary}`
      : "No Listed Salary Range";

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: darkMode ? "#110f1b" : "#fff" },
          animatedStyle,
        ]}
      >
        <View
          style={[styles.header, { backgroundColor: theme.headerBackground }]}
        >
          <TouchableOpacity onPress={handleClose} style={styles.headerLeft}>
            <Ionicons name="chevron-back" size={24} color={theme.headerTitle} />
            <Text style={[styles.headerTitle, { color: theme.headerTitle }]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {!submitted ? (
            <>
              <View
                style={[
                  styles.jobCard,
                  { backgroundColor: darkMode ? "#1B1A28" : "#fff" },
                ]}
              >
                <Image source={{ uri: job.companyLogo }} style={styles.logo} />

                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>
                    {job.title}
                  </Text>

                  <Text style={[styles.company, { color: theme.placeholder }]}>
                    {job.companyName}
                  </Text>

                  <Text style={[styles.salary, { color: theme.primary }]}>
                    {salary}
                  </Text>

                  <Text style={[styles.meta, { color: theme.text }]}>
                    {toTitleCase(job.workModel)} • {toTitleCase(job.jobType)} •{" "}
                    {toTitleCase(job.seniorityLevel)}
                  </Text>
                </View>
              </View>

              {/* FORM */}
              <View style={styles.form}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Full Name
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: darkMode ? "#212033" : "#ddd",
                      color: theme.text,
                    },
                  ]}
                  placeholder="John Doe"
                  placeholderTextColor={theme.placeholder}
                  value={name}
                  onChangeText={setName}
                />

                <Text style={[styles.label, { color: theme.text }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: darkMode ? "#212033" : "#ddd",
                      color: theme.text,
                    },
                  ]}
                  placeholder="example@email.com"
                  placeholderTextColor={theme.placeholder}
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={[styles.label, { color: theme.text }]}>
                  Contact Number
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: darkMode ? "#212033" : "#ddd",
                      color: theme.text,
                    },
                  ]}
                  placeholder="+63..."
                  placeholderTextColor={theme.placeholder}
                  value={contact}
                  onChangeText={setContact}
                />

                <Text style={[styles.label, { color: theme.text }]}>
                  Why should we hire you?
                </Text>
                <TextInput
                  style={[
                    styles.textarea,
                    {
                      borderColor: darkMode ? "#212033" : "#ddd",
                      color: theme.text,
                    },
                  ]}
                  multiline
                  placeholder="Tell us why you're a good fit..."
                  placeholderTextColor={theme.placeholder}
                  value={whyHire}
                  onChangeText={setWhyHire}
                />
              </View>
            </>
          ) : (
            <View style={styles.success}>
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={theme.primary}
              />

              <Text style={[styles.successTitle, { color: theme.text }]}>
                Application Sent
              </Text>

              <Text style={[styles.successText, { color: theme.placeholder }]}>
                Your application has been submitted successfully.
              </Text>

              <TouchableOpacity
                style={[styles.successBtn, { backgroundColor: theme.primary }]}
                onPress={handleClose}
              >
                <Text style={styles.successBtnText}>Okay</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {!submitted && (
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: theme.alt,
                borderTopColor: darkMode ? "#222" : "#E5E7EB",
                paddingBottom: 30,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: theme.card }]}
              onPress={handleClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitBtn,
                { backgroundColor: theme.headerBackground },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
