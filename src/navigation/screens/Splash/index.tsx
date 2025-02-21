import { useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { setToken } = useContext(AuthContext);

  const init = async() => {
    const token = await AsyncStorage.getItem("token");
    console.log(token,"token")
    if (token === null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "AllTasks" }],
      });
      
    }
    setToken(JSON.parse(token));
  };
  useEffect(() => {
    init();
  }, []);

  return null;
};

export default SplashScreen;
