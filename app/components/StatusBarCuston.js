import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

// Inicio
export default function StatusBarCuston(props) {
  // props
  const { backgroundColor, ...rest } = props;
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView style={{ flex: 0, backgroundColor: backgroundColor }} />
    </>
  );
}
