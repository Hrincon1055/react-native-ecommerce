import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
// Mis componentes
import { API_URL } from "../../utils/constansts";
import colors from "../../styles/colors";
// Inicio
export default function ProductList(props) {
  // props
  const { produts } = props;
  // constantes
  const navigation = useNavigation();
  // funciones
  const calcPrice = (price, discount) => {
    if (!discount) {
      return price;
    }
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };
  const goToProdut = (id) => {
    navigation.push("product", { idProduct: id });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>RESULTADOS</Text>
      {map(produts, (produt) => (
        <TouchableWithoutFeedback
          key={produt._id}
          onPress={() => goToProdut(produt._id)}
        >
          <View style={styles.product}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: `${API_URL}${produt.main_image.url}` }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                {produt.title}
              </Text>
              <View style={styles.price}>
                <Text style={styles.currentPrice}>
                  {calcPrice(produt.price, produt.discount)} $
                </Text>
                {produt.discount && (
                  <Text style={styles.oldPrice}>{produt.price} $</Text>
                )}
              </View>
              <Button style={styles.btn} color={colors.primary}>
                Ver Producto
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
  },
  containerImage: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    padding: 5,
  },
  image: {
    height: 200,
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
  },
  name: {
    fontSize: 16,
  },
  price: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  currentPrice: {
    fontSize: 16,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btn: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
  },
});
