import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { stylesTextFont } from "../LoginScreen";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";
import { storagePoints } from "../../components/PointsCount";
import { routeSelector } from "../../components/RandomRoute";
import { RouteName } from "../../interfaces/routeName";

export const LogoutScreen = () => {
  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {
    let routeName: string = "";

    const randomRoutes: RouteName[] = [
      { name: "Press" },
      { name: "Exit" },
      { name: "LogoutR" },
      { name: "Delete" },
      { name: "Substract" },
      { name: "Rating" },
      { name: "Locate" },
      { name: "Search" },
      { name: "Touch" },
    ];

    routeName = routeSelector(randomRoutes);
    storagePoints(1);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  };

  //Función cerrar sesión
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
    );
  };

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormal}>
        Vamos a realizar una prueba de confianza
      </Text>
      <Text style={stylesTextFont.textNormal}>Lo único que tienes que hacer es aplastar el botón rojo</Text>
      <Button style={styles.redButton} mode="contained" onPress={randomRoute}>Confiar</Button>
      <Button style={styles.blueButton} mode="contained" onPress={handlerSignOut}>No Confiar</Button>
      <Text style={stylesTextFont.textNormal}>Solo confia...</Text>
    </View>
  );
};
