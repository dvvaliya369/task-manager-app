import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container:{ margin: 10 },
  titleContainer: {
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#305f72",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "flex-start",
    flexDirection: "column",
    marginBottom: 16,
  },
  descContainer: {
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#305f72",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  title:{
    color: "black",
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 5,
  },
  value:{  fontSize: 18,
    color: "black",
    marginHorizontal: 15,}
});
