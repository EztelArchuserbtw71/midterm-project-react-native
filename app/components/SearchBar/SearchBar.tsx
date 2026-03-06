import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../contexts/AppContext";
import { createStyles } from "./styles";
import { SearchBarProps } from "./types";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Find a job...",
}: SearchBarProps) {
  const { theme } = useAppContext();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={28} color={theme.inputText} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.inputText}
        value={value}
        onChangeText={onChange}
        style={[styles.input, { color: theme.inputTextActual }]}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChange("")}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={24} color={theme.inputText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
