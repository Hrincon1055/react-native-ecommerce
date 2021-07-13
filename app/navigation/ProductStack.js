import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Mis componentes
import Home from "../screens/product/Home";
import Product from "../screens/product/Product";
import Search from "../screens/product/Search";
import colors from "../styles/colors";
// Constantes globales
const Stack = createStackNavigator();
// Inicia
export default function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLiht,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{ title: "Producto", headerShown: false }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ title: "Search", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
