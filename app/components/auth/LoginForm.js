import React, { useState } from "react";
import { View, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
// Mis componentes
import useAuth from "../../hooks/useAuth";
import { loginApi } from "../../api/user";
import { formStyle } from "../../styles";

// Inicio
export default function LoginForm(props) {
  // props
  const { changeForm } = props;
  // state
  const [loading, setLoading] = useState(false);
  // global state
  const { login } = useAuth();

  // Funciones
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await loginApi(formData);
        if (response.statusCode) throw "Error en el usuario o contraseña";
        login(response);
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    },
  });

  return (
    <View>
      <TextInput
        label="E-mail o Username"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      <TextInput
        label="Contraseña"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Registrate
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}
function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
