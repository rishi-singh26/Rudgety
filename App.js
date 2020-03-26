import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./Components/MainComponent";

export default function App() {
  return (
    // <Provider store={store}>
    // <MenuProvider>
    <Main />
    // </MenuProvider>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
