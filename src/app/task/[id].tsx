import Colors from "@/constants/colors";
import { TASKS } from "@/constants/tasks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TASK_DETAILS: Record<
  string,
  {
    description: string;
    priority: string;
    duration: string;
    project: string;
  }
> = {
  "1": {
    description:
      "Research the target users, existing grocery shopping applications, their key features, and common user pain points. Summarize the findings so the design team can make better product decisions.",
    priority: "High",
    duration: "2 hours",
    project: "Grocery Shopping App",
  },

  "2": {
    description:
      "Compare competing grocery shopping applications and identify their strengths, weaknesses, useful features, and opportunities for improvement.",
    priority: "High",
    duration: "2 hours",
    project: "Grocery Shopping App",
  },

  "3": {
    description:
      "Create the first low-fidelity wireframes for the Uber Eats redesign. Focus on layout, navigation, content hierarchy, and the main user flow.",
    priority: "Medium",
    duration: "3 hours",
    project: "Uber Eats Redesign",
  },

  "4": {
    description:
      "Prepare a clear explanation of how to pitch a Design Sprint, including the problem, process, expected outcomes, and how to present the idea to stakeholders.",
    priority: "Medium",
    duration: "1 hour",
    project: "Design Sprint",
  },
};

const STATUS_COLOR = {
  Done: Colors.statusDone,
  "In Progress": Colors.statusInProgress,
  "To-do": Colors.statusTodo,
};

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const task = TASKS.find(
    (item) => item.id === id
  );

  const details = id
    ? TASK_DETAILS[id]
    : undefined;

  if (!task || !details) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Task not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Task Details
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Task title */}

        <View style={styles.titleSection}>
          <View
            style={[
              styles.iconBadge,
              {
                backgroundColor:
                  task.icon.backgroundColor,
              },
            ]}
          >
            <Ionicons
              name={task.icon.name as any}
              size={24}
              color="#ffffff"
            />
          </View>

          <Text style={styles.category}>
            {task.category}
          </Text>

          <Text style={styles.title}>
            {task.title}
          </Text>

          <Text
            style={[
              styles.status,
              {
                color:
                  STATUS_COLOR[task.status],
              },
            ]}
          >
            {task.status}
          </Text>
        </View>

        {/* Task information */}

        <View style={styles.infoCard}>
          <InfoRow
            icon="time-outline"
            label="Time"
            value={task.time}
          />

          <InfoRow
            icon="flag-outline"
            label="Priority"
            value={details.priority}
          />

          <InfoRow
            icon="hourglass-outline"
            label="Duration"
            value={details.duration}
          />

          <InfoRow
            icon="folder-outline"
            label="Project"
            value={details.project}
          />
        </View>

        {/* Description */}

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {details.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={20}
        color={Colors.primary}
      />

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  headerSpacer: {
    width: 44,
  },

  titleSection: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 22,
    marginTop: 8,
  },

  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  category: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 7,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  status: {
    fontSize: 13,
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginTop: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoText: {
    marginLeft: 14,
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  descriptionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 20,
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
});