import React from "react";
import { Animated, Text } from "react-native";
import { styles } from "./styles";
import { useAppContext } from "@/app/contexts/AppContext";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  const [translateY] = React.useState(new Animated.Value(20));
  const [opacity] = React.useState(new Animated.Value(0));
  const { theme, darkMode, saveJob, removeJob, isJobSaved, openJob } =
    useAppContext();

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: theme.primary,
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}
