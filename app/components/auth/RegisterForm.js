import React, { useState } from "react";
import { View, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
// Mis componentes
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles/";
// Inicio
export default function RegisterForm(props) {
  // props
  const { changeForm } = props;
  // state
  const [loading, setLoading] = useState(false);
  // Funciones
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await registerApi(formData);
        console.log(response?.data);
        changeForm();
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
        label="E-mail"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        label="Nombre usuario"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <TextInput
        label="Contraseña"
        style={formStyle.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <TextInput
        label="Repetir Contraseña"
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
        Registrarse
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}
// Funciones internas
function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")]),
  };
}
