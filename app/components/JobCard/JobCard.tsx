import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useAppContext } from "../../contexts/AppContext";
import { styles } from "./styles";

type JobTileProps = {
  job: any;
};

const toTitleCase = (text?: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function JobTile({ job }: JobTileProps) {
  const { theme, darkMode, saveJob, removeJob, isJobSaved, openJob } =
    useAppContext();
  const saved = isJobSaved(job.uuid);

  const salary =
    job.minSalary && job.maxSalary
      ? job.minSalary === job.maxSalary
        ? `${job.currency} ${job.minSalary}`
        : `${job.currency} ${job.minSalary} - ${job.currency} ${job.maxSalary}`
      : "No Listed Salary Range";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => openJob(job.uuid)}
      style={[
        styles.tile,
        { backgroundColor: darkMode ? "#1B1A28" : "#ffffff" },
      ]}
    >
      <TouchableOpacity
        style={styles.bookmarkBtn}
        onPress={(e) => {
          e.stopPropagation();
          saved ? removeJob(job.uuid) : saveJob(job.uuid);
        }}
      >
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={22}
          color={saved ? theme.primary : darkMode ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Image source={{ uri: job.companyLogo }} style={styles.logo} />
        <View style={{ flex: 1, marginLeft: 12, marginRight: 36 }}>
          <Text
            style={[styles.title, { color: theme.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {job.title}
          </Text>
          <Text style={[styles.company, { color: theme.placeholder }]}>
            {job.companyName}
          </Text>
          <Text style={[styles.salary, { color: theme.primary }]}>
            {salary}
          </Text>
        </View>
      </View>

      <View style={styles.badgesRow}>
        <View style={[styles.badge, { backgroundColor: theme.alt }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            {toTitleCase(job.workModel)}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.alt }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            {toTitleCase(job.jobType)}
          </Text>
        </View>
        {job.locations?.length > 0 && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: theme.alt,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <Ionicons
              name="location-outline"
              size={12}
              color={theme.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.badgeText, { color: theme.primary }]}>
              {job.locations[0]}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
