import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { size } from "lodash";
// Mis api
import useAuth from "../../hooks/useAuth";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";

// Inicio
export default function Favorite(props) {
  // props
  const { product } = props;
  // state
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  // constantes
  const { auth } = useAuth();
  // effect
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product._id);
      if (size(response) === 0) {
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    })();
  }, [product]);
  // funciones
  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await addFavoriteApi(auth, product._id);
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await deleteFavoriteApi(auth, product._id);
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  // returns
  if (setIsFavorite === "undefined") {
    return null;
  }
  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={
          isFavorite
            ? styles.btnDeleteFavoritesContent
            : styles.btnAddFavoritesContent
        }
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={isFavorite ? deleteFavorite : addFavorite}
        loading={loading}
      >
        {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </Button>
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnDeleteFavoritesContent: {
    backgroundColor: "#c40000",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
