import React, { useState, useEffect } from "react";
import { size } from "lodash";
// Mis Api
import { searchProductsApi } from "../../api/search";
import StatusBarCuston from "../../components/StatusBarCuston";
import Search from "../../components/search";
import ScreenLoading from "../../components/ScreenLoading";
import ResultNotFound from "../../components/search/ResultNotFound";
import ProductList from "../../components/search/ProductList";
import colors from "../../styles/colors";
// Inicio
export default function SearchScreen(props) {
  // props
  const {
    route: { params },
  } = props;
  // state
  const [produts, setProduts] = useState(null);
  // effect
  useEffect(() => {
    (async () => {
      setProduts(null);
      const response = await searchProductsApi(params.search);
      setProduts(response);
    })();
  }, [params.search]);
  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search currentSearch={params.search} />
      {!produts ? (
        <ScreenLoading text="Buscando Productos" />
      ) : size(produts) === 0 ? (
        <ResultNotFound currentSearch={params.search} />
      ) : (
        <ProductList produts={produts} />
      )}
    </>
  );
}
