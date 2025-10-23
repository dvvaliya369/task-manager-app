import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

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
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    createtaskbuttonview: {
      alignItems: "center",
      marginTop: 50,
      backgroundColor: colors.buttonBackground,
      borderRadius: 30,
    },
    createtasktextstyle: {
      color: colors.buttonText,
      fontSize: 25,
      padding: 10,
    },
  });

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

