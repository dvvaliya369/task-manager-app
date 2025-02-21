import { ActivityIndicator, FAB } from "react-native-paper";
import { Alert, FlatList, RefreshControl, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../Context/AuthContext";
import TaskListItem from "../../../Components/TaskListItem";
import axios from "axios";
import { styles } from "./styles";

const AllTasksScreen = () => {
  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

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
      <ActivityIndicator size={"large"} color={"#305f72"} />
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
            tintColor={"#305f72"}
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
        color="white"
        onPress={() => navigation.navigate("CreateTask")}
      />
    </View>
  );
};

export default AllTasksScreen;
