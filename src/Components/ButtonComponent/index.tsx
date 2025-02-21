import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";
import { styles } from "./styles";

type ButtonComponentProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const ButtonComponent = ({
  onPress,
  title,
  disabled,
}: ButtonComponentProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.createtaskbuttonview,
        {
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.createtasktextstyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

