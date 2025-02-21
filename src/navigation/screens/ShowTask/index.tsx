import { Alert, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../../Context/AuthContext";
import ButtonComponent from "../../../Components/ButtonComponent";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ShowTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  const id = route?.params?.id;

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `https://task-manager-backend-production-8fe2.up.railway.app/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res?.data, "get tasks res");
          setTask(res?.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error?.response?.data?.error);
      Alert.alert(error?.response?.data?.error || "Something went wrong!");
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.emptyContainer}>
      <ActivityIndicator size={"large"} color={"#305f72"} />
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={styles.titleContainer}
      >
        <Text
          style={styles.title}
        >
          Title :
        </Text>
        <Text style={styles.value}>
          {task?.title}
        </Text>
      </View>
      <View
        style={styles.descContainer}
      >
        <Text
          style={styles.title}
        >
          Description :
        </Text>
        <Text style={styles.value}>
          {task?.description}
        </Text>
      </View>
      <ButtonComponent
        title="Edit Task"
        onPress={() => {
          navigation.navigate("EditTask", { task });
        }}
      />
    </View>
  );
};

export default ShowTaskScreen;
