import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";
// Mis api
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import AddressList from "../../components/address/AddressList";
import colors from "../../styles/colors";
// Inicio
export default function Addresses() {
  // state
  const [addresses, setAddresses] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);
  // Constantes
  const { auth } = useAuth();
  const navigatio = useNavigation();
  // Effect
  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddress(false);
      })();
    }, [reloadAddress])
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableOpacity onPress={() => navigatio.navigate("add-address")}>
        <View style={styles.addAddress}>
          <Text style={styles.addAddressText}>Añadir una dirección</Text>
          <IconButton icon="arrow-right" color={colors.dark} size={19} />
        </View>
      </TouchableOpacity>
      {!addresses ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
          color={colors.dark}
        />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddress={setReloadAddress}
        />
      )}
    </ScrollView>
  );
}
// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
