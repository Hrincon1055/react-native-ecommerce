import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { size } from "lodash";
// Mis api
import { paymentCartApi, deleteCartApi } from "../../api/cart";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import { formStyle } from "../../styles";
import colors from "../../styles/colors";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constansts";
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);
// Inicio
export default function Payment(props) {
  // props
  const { products, selectedAddress, totalPayment } = props;
  // state
  const [loading, setLoading] = useState(false);
  // constantes
  const { auth } = useAuth();
  const navigation = useNavigation();
  // formik
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const result = await stripe.createToken({ card: formData });
      if (result?.error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          result.error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else {
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          selectedAddress
        );
        if (size(response) > 0) {
          await deleteCartApi();
          navigation.navigate("account", {
            screen: "orders",
          });
        } else {
          ToastAndroid.showWithGravity(
            "Error al realizar el pedido",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setLoading(false);
      }
    },
  });
  // returns
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Forma de pago</Text>
      <TextInput
        label="Nombre de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />
      <View style={styles.containerInput}>
        <View style={styles.containerMonthYearInput}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>
      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={!loading && formik.handleSubmit}
        loading={loading}
      >
        Pagar {totalPayment && `(${totalPayment} $)`}
      </Button>
    </View>
  );
}
// funciones internas
function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}
function validationSchema() {
  return {
    number: Yup.string().min(16, true).max(16, true).required(true),
    exp_month: Yup.string().min(1, true).max(2, true).required(true),
    exp_year: Yup.string().min(2, true).max(2, true).required(true),
    cvc: Yup.string().min(3, true).max(3, true).required(true),
    name: Yup.string().min(4, true).required(true),
  };
}
// estilos
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 30,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerMonthYearInput: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  inputCvc: {
    width: "40%",
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
