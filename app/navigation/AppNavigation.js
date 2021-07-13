import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
// Mis Componentes
import AccountStack from "./AccountStack";
import ProductStack from "./ProductStack";

import colors from "../styles/colors";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";

// constantes globales
const Tab = createMaterialBottomTabNavigator();

// Inicio
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={ProductStack}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: "Favorites" }}
        />
        <Tab.Screen name="cart" component={Cart} options={{ title: "Cart" }} />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Account" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// Funciones internas
function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "bars";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={styles.icon} />;
}
// stilod
const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLiht,
  },
});
