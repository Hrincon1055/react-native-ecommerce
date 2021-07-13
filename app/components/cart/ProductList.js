import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { map } from "lodash";
// Mis api
import { getProductApi } from "../../api/product";
// Mis componentes
import Product from "../../components/cart/Product";
import ScreenLoading from "../../components/ScreenLoading";
// Inicio
export default function ProductList(props) {
  // props
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

  // effect
  useEffect(() => {
    (async () => {
      setProducts(null);
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
        const price = calcPrice(response.price, response.discount);
        totalPaymentTemp += price * product.quantity;
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
    })();
  }, [cart]);
  // returns
  return (
    <View>
      <Text style={styles.title}>Productos:</Text>
      {!products ? (
        <ScreenLoading text="Cargando carrito" size="large" />
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
    </View>
  );
}
// funciones
function calcPrice(price, discount) {
  if (!discount) {
    return price;
  }
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}
// estilos
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
