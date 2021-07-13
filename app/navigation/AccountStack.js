import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Mis componentes
import Account from "../screens/account/Account";
import ChangeName from "../screens/account/ChangeName";
import ChangeEmail from "../screens/account/ChangeEmail";
import ChangeUsername from "../screens/account/ChangeUsername";
import ChangePassword from "../screens/account/ChangePassword";
import Addresses from "../screens/account/Addresses";
import AddAddress from "../screens/account/AddAddress";
import Orders from "../screens/account/Orders";
import colors from "../styles/colors";
// Constantes globales
const Stack = createStackNavigator();
// Inicio
export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLiht,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: "Cambiar nombre y apellidos", headerShown: true }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{ title: "Cambiar email", headerShown: true }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{ title: "Cambiar username", headerShown: true }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{ title: "Cambiar contraseña", headerShown: true }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{ title: "Mis direcciones", headerShown: true }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{ title: "Nueva dirección", headerShown: true }}
      />
      <Stack.Screen
        name="orders"
        component={Orders}
        options={{ title: "Mis pedidos", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
