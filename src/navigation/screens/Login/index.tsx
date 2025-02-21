import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { isEmailInvalid, isPasswordInvalid } from "../../../Validation/Valid";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../../../Components/ButtonComponent";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    try {
      const body = { email, password };
      console.log(body);
      await axios
        .post(
          "https://task-manager-backend-production-8fe2.up.railway.app/auth/login",
          body,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data, "login response");
          Alert.alert(res.data?.message, "", [
            {
              text: "Ok",
              onPress: async () => {
                await AsyncStorage.setItem(
                  "token",
                  JSON.stringify(res?.data?.token)
                );
                navigation.replace("AllTasks");
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
        label={"Email"}
        value={email}
        mode="outlined"
        style={{ marginTop: 30 }}
        activeUnderlineColor="#305f72"
        activeOutlineColor="#305f72"
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
          label={"Password"}
          value={password}
          mode="outlined"
          secureTextEntry={!showPass}
          style={{ marginTop: 30 }}
          activeUnderlineColor="#305f72"
          activeOutlineColor="#305f72"
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
            color="#305f72"
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
      <Text
        style={styles.forgotPass}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        Forgot Password?
      </Text>
      <Text style={styles.text}>
        Don't have an account?
        <Text
          style={styles.registerText}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          {" "}
          Sign up
        </Text>
      </Text>
      <ButtonComponent
        title="Login"
        onPress={handleLogin}
        disabled={isPasswordInvalid(password) || isEmailInvalid(email)}
      />
    </View>
  );
};

export default LoginScreen;
