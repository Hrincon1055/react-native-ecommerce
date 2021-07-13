import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// Mis Api
import { getLastProductsApi } from "../../api/product";
// Mis componentes
import ListProducts from "./ListProducts";
// Inicio
export default function NewProducts() {
  // state
  const [products, setProducts] = useState(null);
  // effect
  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(30);
      setProducts(response);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos productos</Text>
      {products && <ListProducts products={products} />}
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
