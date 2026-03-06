import React from "react";
import { View } from "react-native";
import Toast from "./Toast";
import { styles } from "./styles";
import { ToastItem } from "./types";

interface ToastContainerProps {
  toasts: ToastItem[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} />
      ))}
    </View>
  );
}
