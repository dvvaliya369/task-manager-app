import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
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
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    listcontainerview: {
      flex: 1,
      margin: 10,
    },
    listview: {
      backgroundColor: colors.card,
      padding: 10,
      elevation: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 10,
    },
    listtext: {
      fontSize: 18,
      color: colors.text,
      marginHorizontal: 10,
    },
    button:{
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 25,
    }
  });

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
          <AntDesign name="delete" size={25} color={colors.deleteIcon} onPress={handleDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskListItem;
