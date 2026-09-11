import Colors from "@/constants/colors";
import { Task } from "@/constants/tasks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const STATUS_COLOR = {
  Done: Colors.statusDone,
  "In Progress": Colors.statusInProgress,
  "To-do": Colors.statusTodo,
};

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  const handleTaskPress = () => {
    router.push({
      pathname: "/task/[id]",
      params: {
        id: task.id,
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={handleTaskPress}
    >
      <View style={styles.content}>
        {/* Category */}
        <Text style={styles.category}>
          {task.category}
        </Text>

        {/* Task Title */}
        <Text style={styles.title}>
          {task.title}
        </Text>

        {/* Bottom information */}
        <View style={styles.footer}>
          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={Colors.primary}
            />

            <Text style={styles.time}>
              {task.time}
            </Text>
          </View>

          <Text
            style={[
              styles.status,
              {
                color: STATUS_COLOR[task.status],
              },
            ]}
          >
            {task.status}
          </Text>
        </View>
      </View>

      {/* Task Icon */}
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
          size={18}
          color="#ffffff"
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: Colors.border,
  },

  content: {
    flex: 1,
  },

  category: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  time: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "500",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 14,
  },
});