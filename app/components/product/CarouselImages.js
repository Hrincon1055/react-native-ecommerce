import React, { useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
// Mis componentes
import { API_URL } from "../../utils/constansts";
// Constantes globales
const width = Dimensions.get("window").width;
const height = 500;
// Inicio
export default function CarouselImages(props) {
  // props
  const { images } = props;
  // state
  const [imageActive, setImageActive] = useState(0);
  // funciones
  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.carousel}
        source={{ uri: `${API_URL}${item.url}` }}
      />
    );
  };
  return (
    <>
      <Carousel
        layout={"default"}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
}
// estilos
const styles = StyleSheet.create({
  carousel: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
});
