import * as React from "react";
import { Text, View } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./HomeScreen";
import ExpencesScreen from "./ExpencesScreen";
import IncomeScreen from "./IncomeScreen";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Expences" component={ExpencesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
