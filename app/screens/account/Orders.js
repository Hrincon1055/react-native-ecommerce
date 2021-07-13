import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
// Mis api
import { getOrderApi } from "../../api/order";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import StatusBarCuston from "../../components/StatusBarCuston";
import ListOrder from "../../components/order/ListOrder";
import colors from "../../styles/colors";

// Inicio
export default function Orders() {
  // state
  const [orders, setOrders] = useState(null);
  // constantes
  const { auth } = useAuth();
  // effects
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrderApi(auth);
        setOrders(response);
      })();
    }, [])
  );
  // returns
  return (
    <>
      <StatusBarCuston />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mis pedidos</Text>
        {!orders ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color={colors.bgDark}
          />
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrderText}>No tienes pedidos</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  loading: {
    marginTop: 20,
  },
  noOrderText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
});
