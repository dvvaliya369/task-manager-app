import { Alert, TouchableOpacity } from "react-native";
// Import Screens
import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";

import AllTasksScreen from "./screens/AllTasks";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateTaskScreen from "./screens/CreateTask";
import EditTaskScreen from "./screens/EditTask";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import LoginScreen from "./screens/Login";
import ShowTaskScreen from "./screens/ShowTask";
import SignUpScreen from "./screens/SignUp";
import SplashScreen from "./screens/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const RootStack = createNativeStackNavigator({
  screens: {
    Splash: {
      screen: SplashScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "Login",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "Forgot Password",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    SignUp: {
      screen: SignUpScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "Sign Up",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    AllTasks: {
      screen: AllTasksScreen,
      options: ({ navigation }) => {
        const { colors, theme, toggleTheme } = useContext(ThemeContext);
        return {
          title: "All Tasks",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerLeft: () => (
            <TouchableOpacity
              onPress={toggleTheme}
              style={{ marginLeft: 10 }}
            >
              <Ionicons
                name={theme === "light" ? "moon" : "sunny"}
                size={24}
                color={colors.headerText}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Are you sure you want to log out?", "", [
                  {
                    text: "Yes",
                    style: "cancel",
                    onPress: () => {
                      AsyncStorage.removeItem("token");
                      navigation.navigate("Splash");
                    },
                  },
                  {
                    text: "No",
                    onPress: () => console.log("cancel Pressed"),
                    style: "destructive",
                  },
                ]);
              }}
            >
              <AntDesign name="logout" size={24} color={colors.headerText} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    CreateTask: {
      screen: CreateTaskScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "New Task",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    EditTask: {
      screen: EditTaskScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "Edit Task",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
    ShowTask: {
      screen: ShowTaskScreen,
      options: () => {
        const { colors } = useContext(ThemeContext);
        return {
          title: "Task",
          headerTitleAlign: "center",
          headerTintColor: colors.headerText,
          headerStyle: { backgroundColor: colors.headerBackground },
        };
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
