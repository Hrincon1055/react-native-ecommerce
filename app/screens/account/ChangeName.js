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
export default function ChangeName() {
  // state
  const [loading, setLoading] = useState(false);
  // constantes
  const { auth } = useAuth();
  const navigatio = useNavigation();
  // Formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await updateUserApi(auth, formData);
        navigatio.goBack();
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          "Error al actualizar los datos",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    },
  });
  // Effect
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);

        response.name && (await formik.setFieldValue("name", response.name));
        response.lastname &&
          (await formik.setFieldValue("lastname", response.lastname));
      })();
    }, [])
  );
  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Apellidos"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre y apellidos
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}
function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
