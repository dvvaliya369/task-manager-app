import { Alert, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

type TaskListItemProps = {
  item: {
    _id: string;
    title: string;
    description: string;
  };
  handleDeleteTask: (id: any) => Promise<void>;
};
const TaskListItem = ({ item,handleDeleteTask }: TaskListItemProps) => {
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert('Are you sure you want to delete task?', '', [
      {
        text: 'Yes',
        style: 'cancel',
        onPress: () => {
          handleDeleteTask(item?._id);
        },
      },
      {
        text: 'No',
        onPress: () => console.log('cancel Pressed'),
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.listcontainerview}
      onPress={() => {
        navigation.navigate("ShowTask", { id: item?._id });
      }}
    >
      <View style={styles.listview}>
        <Text style={styles.listtext}>{item.title}</Text>
        <View style={styles.button}>
          <AntDesign name="delete" size={25} color="white" onPress={handleDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskListItem;
