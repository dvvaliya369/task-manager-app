import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { isEmailInvalid, isPasswordInvalid } from "../../../Validation/Valid";

import ButtonComponent from "../../../Components/ButtonComponent";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);

  const handleResetPass = async () => {
    try {
      const body = { email, oldPassword, newPassword };
      console.log(body);
      await axios
        .post(
          "https://task-manager-backend-production-8fe2.up.railway.app/auth/reset-password",
          body,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data, "reset response");
          Alert.alert(res?.data?.message, "", [
            {
              text: "Ok",
              onPress: () => {
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
          label={"Old Password"}
          value={oldPassword}
          mode="outlined"
          secureTextEntry={!showOldPass}
          style={{ marginTop: 30 }}
          activeUnderlineColor="#305f72"
          activeOutlineColor="#305f72"
          onChangeText={(text) => {
            setOldPassword(text);
          }}
          error={
            isPasswordInvalid(oldPassword)
              ? oldPassword === ""
                ? false
                : true
              : false
          }
        />
        <TouchableOpacity
          onPress={() => {
            setShowOldPass(!showOldPass);
          }}
        >
          <Feather
            name={!showOldPass ? "eye-off" : "eye"}
            size={24}
            color="#305f72"
            style={{ position: "absolute", right: 12, bottom: 12 }}
          />
        </TouchableOpacity>
      </View>
      {isPasswordInvalid(oldPassword) && oldPassword !== "" && (
        <Text style={styles.error}>
          The password must be at least 8 characters long and contain lowercase
          and capital letters and numbers.
        </Text>
      )}
      <View>
        <TextInput
          label={"New Password"}
          value={newPassword}
          mode="outlined"
          secureTextEntry={!showNewPass}
          style={{ marginTop: 30 }}
          activeUnderlineColor="#305f72"
          activeOutlineColor="#305f72"
          onChangeText={(text) => {
            setNewPassword(text);
          }}
          error={
            isPasswordInvalid(newPassword)
              ? newPassword === ""
                ? false
                : true
              : false
          }
        />
        <TouchableOpacity
          onPress={() => {
            setShowNewPass(!showNewPass);
          }}
        >
          <Feather
            name={!showNewPass ? "eye-off" : "eye"}
            size={24}
            color="#305f72"
            style={{ position: "absolute", right: 12, bottom: 12 }}
          />
        </TouchableOpacity>
      </View>
      {isPasswordInvalid(newPassword) && newPassword !== "" && (
        <Text style={styles.error}>
          The password must be at least 8 characters long and contain lowercase
          and capital letters and numbers.
        </Text>
      )}
      {!isPasswordInvalid(newPassword) && newPassword === oldPassword && (
        <Text style={styles.error}>
          New password should not be same as old password.
        </Text>
      )}
      <ButtonComponent
        title="Reset Password"
        onPress={handleResetPass}
        disabled={
          isEmailInvalid(email) ||
          isPasswordInvalid(oldPassword) ||
          isPasswordInvalid(newPassword) ||
          newPassword === oldPassword
        }
      />
    </View>
  );
};

export default ForgotPasswordScreen;
