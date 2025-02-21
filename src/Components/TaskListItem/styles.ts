import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listcontainerview: {
    flex: 1,
    margin: 10,
  },
  listview: {
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#305f72",
    borderWidth: 2,
    borderRadius: 10,
  },
  listtext: {
    fontSize: 18,
    color: "black",
    marginHorizontal: 10,
  },
  button:{
    backgroundColor: "#305f72",
    padding: 10,
    borderRadius: 25,
  }
});
