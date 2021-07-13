import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// Mis api
import { getProductApi } from "../../api/product";
// Mis componentes
import StatusBarCuston from "../../components/StatusBarCuston";
import Search from "../../components/search";
import ScreenLoading from "../../components/ScreenLoading";
import CarouselImages from "../../components/product/CarouselImages";
import Price from "../../components/product/Price";
import Quantity from "../../components/product/Quantity";
import Buy from "../../components/product/Buy";
import Favorite from "../../components/product/Favorite";
import colors from "../../styles/colors";
// Inicio
export default function Product(props) {
  // props
  const {
    route: { params },
  } = props;
  // state
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // effect
  useEffect(() => {
    setProduct(null);
    (async () => {
      const response = await getProductApi(params.idProduct);
      const arrayImages = [response.main_image];
      arrayImages.push(...response.images);
      setImages(arrayImages);
      setProduct(response);
    })();
  }, [params]);
  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barstyle="light-content"
      />
      <Search />
      {!product ? (
        <ScreenLoading text="Cargando producto" size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{product.title}</Text>
          <CarouselImages images={images} />
          <View style={styles.containerView}>
            <Price price={product.price} discount={product.discount} />
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <Buy product={product} quantity={quantity} />
            <Favorite product={product} />
          </View>
        </ScrollView>
      )}
    </>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    padding: 10,
  },
  containerView: {
    padding: 10,
    paddingBottom: 200,
  },
});
