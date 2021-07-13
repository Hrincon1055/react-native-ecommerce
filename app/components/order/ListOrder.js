import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { map } from "lodash";
// Mis componentes
import Order from "./Order";
// Inicio
export default function ListOrder(props) {
  // props
  const { orders } = props;
  return (
    <View>
      <Text style={styles.container}>
        {map(orders, (order) => (
          <Order key={order._id} order={order} />
        ))}
      </Text>
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
});
