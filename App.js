import React, { useState, useMemo, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";
// Mis componentes
import AppNavigation from "./app/navigation/AppNavigation";
import AuthScreen from "./app/screens/Auth";
import AuthContext from "./app/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./app/api/token";

// Inicio
export default function App() {
  // state
  const [auth, setAuth] = useState(undefined);
  // useEfect
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);
  // Funciones
  const login = (user) => {
    console.log("login app.js");
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };
  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };
  // Constantes
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
  if (auth === undefined) {
    return null;
  }
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvider>
    </AuthContext.Provider>
  );
}
