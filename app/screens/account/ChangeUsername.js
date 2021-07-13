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
export default function ChangeUsername() {
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
          throw "El username ya existe.";
        }
        navigatio.goBack();
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        formik.setFieldError("username", true);
      }
    },
  });
  // Effect
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        response.username &&
          (await formik.setFieldValue("username", response.username));
      })();
    }, [])
  );
  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre de usuario"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre de usuario
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    username: "",
  };
}
function validationSchema() {
  return {
    username: Yup.string().min(4, true).required(true),
  };
}
// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
