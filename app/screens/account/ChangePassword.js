import React, { useCallback, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
// Mis api
import { updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import { formStyle } from "../../styles";
// Inicio
export default function ChangePassword() {
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
          throw "Error al cambiar la contraseña.";
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
  return (
    <View style={styles.container}>
      <TextInput
        label="Nueva contraseña"
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <TextInput
        label="Repetir nueva contraseña"
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar contraseña
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}
function validationSchema() {
  return {
    password: Yup.string().min(4, true).required(true),
    repeatPassword: Yup.string()
      .min(4, true)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}
// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
