import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isEmailInvalid, isPasswordInvalid } from "../../../Validation/Valid";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TextInput } from "react-native-paper";
import ButtonComponent from "../../../Components/ButtonComponent";
import { ThemeContext } from "../../../Context/ThemeContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const styles = StyleSheet.create({
    createtaskcontainer: {
      flex: 1,
      margin: 10,
      padding: 10,
      top: 20,
      backgroundColor: colors.background,
    },
    error: {
      color: colors.error,
      marginTop: 6,
    },
    text: {
      textAlign: "center",
      color: colors.text,
      fontSize: 16,
      fontWeight: "500",
      marginTop: 16,
    },
    registerText: { color: colors.primary },
  });

  const handleSignUp = async () => {
    try {
      const body = { name, email, password };
      console.log(body);
      await axios
        .post(
          "https://task-manager-backend-production-8fe2.up.railway.app/auth/signup",
          body,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data, "signup response");
          Alert.alert(res?.data?.message, "", [
            {
              text: "Ok",
              onPress: () => {
                navigation.replace("Login");
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
        label={"Name"}
        value={name}
        mode="outlined"
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <TextInput
        label={"Email"}
        value={email}
        mode="outlined"
        style={{ marginTop: 30 }}
        onChangeText={(text) => {
          setEmail(text?.toLowerCase());
        }}
        error={isEmailInvalid(email) ? (email === "" ? false : true) : false}
      />
      {isEmailInvalid(email) && email !== "" && (
        <Text style={styles.error}>Please enter a valid email</Text>
      )}
      <View>
        <TextInput
          label={" Password "}
          value={password}
          mode="outlined"
          secureTextEntry={!showPass}
          style={{ marginTop: 30 }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          error={
            isPasswordInvalid(password) ? (password === "" ? false : true) : false
          }
        />
        <TouchableOpacity
          onPress={() => {
            setShowPass(!showPass);
          }}
        >
          <Feather
            name={!showPass ? "eye-off" : "eye"}
            size={24}
            color={colors.primary}
            style={{ position: "absolute", right: 12, bottom: 12 }}
          />
        </TouchableOpacity>
      </View>
      {isPasswordInvalid(password) && password !== "" && (
        <Text style={styles.error}>
          The password must be at least 8 characters long and contain lowercase
          and capital letters and numbers.
        </Text>
      )}
      <ButtonComponent
        title="Sign Up"
        onPress={handleSignUp}
        disabled={name === '' || isEmailInvalid(email) || isPasswordInvalid(password) }
      />
    </View>
  );
};

export default SignUpScreen;
