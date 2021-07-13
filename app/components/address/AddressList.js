import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
// Mis api
import { deleteAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import colors from "../../styles/colors";
// Inicio
export default function AddressList(props) {
  // props
  const { addresses, setReloadAddress } = props;
  // constantes
  const { auth } = useAuth();
  const navigatio = useNavigation();
  // Funciones
  const deleteAddresAlert = (address) => {
    Alert.alert(
      "Eliminando dirección",
      `¿Esta seguro de que quieres eliminar la dirección ${address.title}?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddres(address._id),
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  const goToUpdateAddress = (idAddress) => {
    navigatio.navigate("add-address", {
      idAddress,
    });
  };
  const deleteAddres = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddress(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>{address.name_lastname}</Text>
          <Text>{address.address}</Text>
          <View style={styles.blockLine}>
            <Text>{address.state}, </Text>
            <Text>{address.city}, </Text>
            <Text>{address.postal_code}</Text>
          </View>
          <Text>{address.country}</Text>
          <Text>Numero de telefono: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              color={colors.primary}
              style={{ marginRight: 5 }}
              onPress={() => goToUpdateAddress(address._id)}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              color={colors.primary}
              onPress={() => deleteAddresAlert(address)}
            >
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});
