import { ActivityIndicator, FAB } from "react-native-paper";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../Context/AuthContext";
import { ThemeContext } from "../../../Context/ThemeContext";
import TaskListItem from "../../../Components/TaskListItem";
import axios from "axios";

const AllTasksScreen = () => {
  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    emptyText: { color: colors.primary, fontSize: 20, fontWeight: "600" },
    listcontainerview: {
      flex: 1,
      margin: 10,
      backgroundColor: colors.background,
    },
    allTasksList: { paddingBottom: 80, flexGrow: 1 },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      borderRadius: 30,
      backgroundColor: colors.fabBackground,
    }
  });

  useEffect(() => {
    getAllTasks();
  }, [isFocused]);

  const getAllTasks = async (isRefreshing?: boolean) => {
    isRefreshing ? setRefreshing(true) : setLoading(true);
    try {
      let authToken = token;
      if (!authToken) {
        const token = JSON.parse((await AsyncStorage.getItem("token")) ?? "");
        authToken = token;
        setToken(token);
      }
      console.log(authToken, "authToken");
      await axios
        .get(
          "https://task-manager-backend-production-8fe2.up.railway.app/tasks",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res) => {
          console.log(res?.data, "get all tasks res");
          setTasks(res?.data);
          isRefreshing ? setRefreshing(false) : setLoading(false);
        });
    } catch (error) {
      console.log(error?.response?.data?.error);
      Alert.alert(error?.response?.data?.error || "Something went wrong!");
      isRefreshing ? setRefreshing(false) : setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios
        .delete(
          `https://task-manager-backend-production-8fe2.up.railway.app/tasks/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data, "Delete response");
          Alert.alert(res.data?.message);
          getAllTasks();
        });
    } catch (error) {
      console.log(error);
      Alert.alert(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return loading && tasks?.length <= 0 ? (
    <View style={styles.emptyContainer}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  ) : (
    <View style={styles.listcontainerview}>
      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.allTasksList}
        renderItem={({ item }) => {
          return (
            <TaskListItem
              item={item}
              handleDeleteTask={() => handleDeleteTask(item?._id)}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={colors.primary}
            onRefresh={() => getAllTasks(true)}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Task is added</Text>
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        color={colors.fabIcon}
        onPress={() => navigation.navigate("CreateTask")}
      />
    </View>
  );
};

export default AllTasksScreen;
