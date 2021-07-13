import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// Mis Api
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
// Mis componentes
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/search";
import StatusBarCuston from "../../components/StatusBarCuston";
import UserInfo from "../../components/account/UserInfo";
import Menu from "../../components/account/Menu";
import colors from "../../styles/colors";

// Inicio
export default function Account() {
  // state
  const [user, setUser] = useState(null);
  // constantes
  const { auth } = useAuth();
  // useEffect
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBarCuston
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
// const styles = StyleSheet.create({
//   container: {},
// });
