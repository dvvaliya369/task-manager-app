import { Alert, TouchableOpacity } from "react-native";
// Import Screens
import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";

import AllTasksScreen from "./screens/AllTasks";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateTaskScreen from "./screens/CreateTask";
import EditTaskScreen from "./screens/EditTask";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import LoginScreen from "./screens/Login";
import ShowTaskScreen from "./screens/ShowTask";
import SignUpScreen from "./screens/SignUp";
import SplashScreen from "./screens/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      options: {
        title: "Login",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      options: {
        title: "Forgot Password",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
      },
    },
    SignUp: {
      screen: SignUpScreen,
      options: {
        title: "Sign Up",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
      },
    },
    AllTasks: {
      screen: AllTasksScreen,
      options: ({ navigation }) => ({
        title: "All Tasks",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerRight: (props) => (
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
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "#305f72" },
      }),
    },
    CreateTask: {
      screen: CreateTaskScreen,
      options: {
        title: "New Task",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
      },
    },
    EditTask: {
      screen: EditTaskScreen,
      options: {
        title: "Edit Task",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
      },
    },
    ShowTask: {
      screen: ShowTaskScreen,
      options: {
        title: "Task",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#305f72" },
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
