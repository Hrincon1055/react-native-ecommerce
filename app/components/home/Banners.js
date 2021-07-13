import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
// Mis api
import { getBannerApi } from "../../api/home-banner";
// Mis componentes
import { API_URL } from "../../utils/constansts";
// Constantes globales
const width = Dimensions.get("window").width;
const height = 160;
// Inicio
export default function Banners() {
  // state
  const [banners, setBanners] = useState(null);
  const [imageActive, setImageActive] = useState(0);
  // constantes
  const navigation = useNavigation();
  // effect
  useEffect(() => {
    (async () => {
      const response = await getBannerApi();
      setBanners(response);
    })();
  }, []);
  if (!banners) {
    return null;
  }
  // funciones
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };
  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };
  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.dot}
      />
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width: width,
    height: height,
  },
  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  dot: {
    backgroundColor: "#fff",
  },
});
