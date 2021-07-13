import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

// Mis componentes
import StatusBarCuston from "../../components/StatusBarCuston";
import Search from "../../components/search";
import NewProducts from "../../components/home/NewProducts";
import Banners from "../../components/home/Banners";
import colors from "../../styles/colors";
// Inicio
export default function Home() {
  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />
      <ScrollView>
        <Banners />
        <NewProducts />
      </ScrollView>
    </>
  );
}
