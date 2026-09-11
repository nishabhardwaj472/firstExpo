import DateSelector from "@/components/DateSelector";
import FilterTabs from "@/components/FilterTabs";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import Colors from "@/constants/colors";
import { FilterOptions, TASKS } from "@/constants/tasks";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] =
    useState<FilterOptions>("All");

  // Filter tasks based on selected filter
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "To do":
        return TASKS.filter((task) => task.status === "To-do");

      case "In Progress":
        return TASKS.filter(
          (task) => task.status === "In Progress"
        );

      case "Completed":
        return TASKS.filter((task) => task.status === "Done");

      case "All":
      default:
        return TASKS;
    }
  }, [activeFilter]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <StatusBar style="light" />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} />
        )}

        ListHeaderComponent={
          <>
            {/* Header */}
            <Header />

            {/* Date Selector */}
            <DateSelector />

            {/* Filter Tabs */}
            <FilterTabs
              selected={activeFilter}
              onSelect={setActiveFilter}
            />
          </>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Tasks Found
            </Text>

            <Text style={styles.emptyText}>
              There are no tasks in the {activeFilter} category.
            </Text>
          </View>
        }

        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  list: {
    paddingBottom: 24,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});