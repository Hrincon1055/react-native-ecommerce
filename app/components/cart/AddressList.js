import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { map } from "lodash";
// Mis componentes
import ScreenLoading from "../ScreenLoading";
import colors from "../../styles/colors";
// Inicio
export default function AddressList(props) {
  // props
  const { addresses, selectedAddress, setSelectedAddress } = props;
  // effect
  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, [addresses]);
  // returns
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Dirección de envio:</Text>
      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address._id}
          onPress={() => setSelectedAddress(address)}
        >
          <View
            style={[
              styles.address,
              address._id === selectedAddress?._id && styles.checked,
            ]}
          >
            <Text style={styles.title}>{address.title}</Text>
            {!addresses && <ScreenLoading text="Cargando direcciones" />}
            <Text>{address.name_lastname}</Text>
            <Text>{address.address}</Text>
            <View style={styles.blockLine}>
              <Text>{address.state}, </Text>
              <Text>{address.city}, </Text>
              <Text>{address.postal_code}</Text>
            </View>
            <Text>{address.country}</Text>
            <Text>Numero de telefono: {address.phone}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#0098d330",
  },
});
