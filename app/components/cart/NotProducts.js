import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Inicio
export default function NotProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tienes productos en el carrito</Text>
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
