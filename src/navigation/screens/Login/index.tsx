import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TextInput } from "react-native-paper";
import ButtonComponent from "../../../Components/ButtonComponent";
import { ThemeContext } from "../../../Context/ThemeContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
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
    forgotPass: {
      textAlign: "right",
      color: colors.primary,
      fontSize: 16,
      fontWeight: "500",
      marginVertical: 16,
    },
  });

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
        onChangeText={(text) => {
          setEmail(text?.toLowerCase());
        }}
      />
      <View>
        <TextInput
          label={"Password"}
          value={password}
          mode="outlined"
          secureTextEntry={!showPass}
          style={{ marginTop: 30 }}
          onChangeText={(text) => {
            setPassword(text);
          }}
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
        disabled={email === '' || password === ''}
      />
    </View>
  );
};

export default LoginScreen;
