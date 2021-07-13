import React from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
// Mis api
import { addProductCartApi } from "../../api/cart";
// Inicio
export default function Buy(props) {
  // props
  const { quantity, product } = props;
  // funciones
  const addProductCar = async () => {
    const response = await addProductCartApi(product._id, quantity);
    if (response) {
      ToastAndroid.showWithGravity(
        "Producto añadido al carrito",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "Error al añadir el producto al carrito",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addProductCar}
      >
        Añadir a la cesta
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
