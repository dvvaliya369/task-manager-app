import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../../Context/AuthContext";
import { ThemeContext } from "../../../Context/ThemeContext";
import ButtonComponent from "../../../Components/ButtonComponent";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ShowTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const id = route?.params?.id;

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    container:{ margin: 10, backgroundColor: colors.background, flex: 1 },
    titleContainer: {
      backgroundColor: colors.card,
      padding: 10,
      elevation: 10,
      justifyContent: "space-between",
      width: "100%",
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
      alignItems: "flex-start",
      flexDirection: "column",
      marginBottom: 16,
    },
    descContainer: {
      backgroundColor: colors.card,
      padding: 10,
      elevation: 10,
      justifyContent: "space-between",
      width: "100%",
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
      alignItems: "flex-start",
      flexDirection: "column",
    },
    title:{
      color: colors.text,
      marginHorizontal: 10,
      fontSize: 24,
      fontWeight: "600",
      marginVertical: 5,
    },
    value:{  fontSize: 18,
      color: colors.text,
      marginHorizontal: 15,}
  });

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
      <ActivityIndicator size={"large"} color={colors.primary} />
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
