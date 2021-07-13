import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { map } from "lodash";
// Mis componentes
import Product from "./Product";
// Inicio
export default function FavoriteList(props) {
  // props
  const { products, setReloadFavorites } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de favoritos</Text>
      {map(products, (item) => (
        <Product
          key={item._id}
          item={item}
          setReloadFavorites={setReloadFavorites}
        />
      ))}
    </ScrollView>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
