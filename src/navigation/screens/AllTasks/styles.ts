import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { color: "#305f72", fontSize: 20, fontWeight: "600" },
  listcontainerview: {
    flex: 1,
    margin: 10,
  },
  allTasksList: { paddingBottom: 80, flexGrow: 1 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: "#305f72",
  }
});
