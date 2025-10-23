import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#305f72",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#305f72",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "black",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginTop: 5,
  },
});
