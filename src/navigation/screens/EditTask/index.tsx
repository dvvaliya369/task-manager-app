import { Alert, View } from "react-native";
import React, { useContext, useState } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import ButtonComponent from "../../../Components/ButtonComponent";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const EditTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  const task = route?.params?.task;

  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);

  const handleEditTask = async () => {
    try {
      const body = { title, description };
      console.log(body);
      await axios
        .put(
          `https://task-manager-backend-production-8fe2.up.railway.app/tasks/${task?._id}`,
          body,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data, "edit response");
          Alert.alert(res.data?.message, "", [
            {
              text: "Ok",
              onPress: async () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "AllTasks" }],
                });
              },
            },
          ]);
        });
    } catch (error) {
      console.log(error);
      Alert.alert(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <View style={styles.createtaskcontainer}>
      <TextInput
        label={"Title"}
        value={title}
        mode="outlined"
        activeUnderlineColor="#305f72"
        activeOutlineColor="#305f72"
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        label={"Description"}
        value={description}
        mode="outlined"
        style={{ marginTop: 30 }}
        numberOfLines={3}
        multiline={true}
        activeUnderlineColor="#305f72"
        activeOutlineColor="#305f72"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <ButtonComponent
        title="Edit"
        disabled={title === task?.title && description === task?.description}
        onPress={handleEditTask}
      />
    </View>
  );
};

export default EditTaskScreen;
