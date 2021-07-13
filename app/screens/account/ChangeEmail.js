import React, { useCallback, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
// Mis api
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import { formStyle } from "../../styles";

// Inicio
export default function ChangeEmail() {
  // state
  const [loading, setLoading] = useState(false);
  // Constantes
  const { auth } = useAuth();
  const navigatio = useNavigation();
  // Formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) {
          throw "El email ya existe.";
        }
        navigatio.goBack();
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        formik.setFieldError("email", true);
      }
    },
  });
  // Effect
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        response.email && (await formik.setFieldValue("email", response.email));
      })();
    }, [])
  );
  return (
    <View style={styles.container}>
      <TextInput
        label="E-mail"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar E-mail
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    email: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
  };
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
