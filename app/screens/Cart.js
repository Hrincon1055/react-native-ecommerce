import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size } from "lodash";
// Mis api
import { getProductCartApi } from "../api/cart";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
// Mis componentes
import StatusBarCuston from "../components/StatusBarCuston";
import NotProducts from "../components/cart/NotProducts";
import ProductList from "../components/cart/ProductList";
import AddressList from "../components/cart/AddressList";
import Payment from "../components/cart/Payment";
import Search from "../components/search";
import colors from "../styles/colors";
// Inicio
export default function Cart() {
  // state
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  // constantes
  const { auth } = useAuth();
  // effect
  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      setSelectedAddress(null);
      loadCart();
      loadAddresses();
    }, [reloadCart])
  );
  useEffect(() => {
    if (reloadCart) {
      loadCart();
      setReloadCart(false);
    }
  }, [reloadCart]);
  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };
  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);
  };
  // returns
  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barStyle="line-content"
      />
      {!cart || size(cart) === 0 ? (
        <>
          <Search />
          <NotProducts />
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment
              products={products}
              selectedAddress={selectedAddress}
              totalPayment={totalPayment}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
});
