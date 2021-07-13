import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Inicio
export default function ResultNotFound(props) {
  // props
  const { currentSearch } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>
        No hay resultados para {currentSearch}
      </Text>
      <Text style={styles.subText}>
        Revisa la ortografía o usa términos más generales.
      </Text>
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    paddingTop: 5,
  },
});
