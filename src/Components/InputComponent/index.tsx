import { TextInput, TextInputProps, View, Text } from "react-native";

import React from "react";
import { styles } from "./styles";

type InputComponentProps = TextInputProps & {
  label?: string;
  error?: string;
};

const InputComponent = ({
  label,
  error,
  style,
  ...props
}: InputComponentProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputComponent;
