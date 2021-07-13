import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// Inicio
export default function Quantity(props) {
  // props
  const { quantity, setQuantity } = props;
  return (
    <View style={{ zIndex: 2 }}>
      <DropDownPicker
        items={[
          {
            label: "1",
            value: 1,
          },
          {
            label: "2",
            value: 2,
          },
          {
            label: "3",
            value: 3,
          },
        ]}
        defaultValue={quantity}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownPicker}
        style={styles.dropDownPicker}
        labelStyle={styles.labelStyle}
        onChangeItem={(item) => setQuantity(item.value)}
      />
    </View>
  );
}
// estilos
const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 150,
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownStyle: {
    backgroundColor: "#fafafa",
  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
  },
  labelStyle: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },
});
