import { Alert, View } from "react-native";
import React, { useContext, useState } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import ButtonComponent from "../../../Components/ButtonComponent";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    try {
      const body = { title, description };
      console.log(body);
      await axios
        .post(
          "https://task-manager-backend-production-8fe2.up.railway.app/tasks",
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
          console.log(res.data, "create response");
          Alert.alert(res.data?.message, "", [
            {
              text: "Ok",
              onPress: async () => {
                navigation.goBack();
              },
            },
          ]);
        });
    } catch (error) {
      console.log(error?.response?.data?.error);
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
        title="Save"
        onPress={handleCreateTask}
        disabled={title === "" || description === ""}
      />
    </View>
  );
};

export default CreateTaskScreen;
