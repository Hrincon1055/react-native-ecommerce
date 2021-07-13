import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
// Mis api
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
// Mis componentes
import StatusBarCuston from "../components/StatusBarCuston";
import Search from "../components/search";
import ScreenLoading from "../components/ScreenLoading";
import FavoriteList from "../components/favorites/FavoriteList";
import colors from "../styles/colors";
// Inicio
export default function Favorites() {
  // state
  const [products, setProducts] = useState(null);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  // constantes
  const { auth } = useAuth();
  // effect
  useFocusEffect(
    useCallback(() => {
      setProducts(null);
      (async () => {
        const response = await getFavoriteApi(auth);
        setProducts(response);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />
      {!products ? (
        <ScreenLoading text="Cargando lista" />
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de favoritos</Text>
          <Text>No tienes productos en tu lista</Text>
        </View>
      ) : (
        <FavoriteList
          products={products}
          setReloadFavorites={setReloadFavorites}
        />
      )}
    </>
  );
}
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
