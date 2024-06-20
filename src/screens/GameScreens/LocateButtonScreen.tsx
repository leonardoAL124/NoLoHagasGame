import React from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { storagePoints } from '../../components/PointsCount'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'
import { signOut } from 'firebase/auth'
import { auth } from '../../configs/firebaseConfig'

export const LocateButtonScreen = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";

    const randomRoutes: RouteName[] = [
      { name: "Press" },
      { name: "Logout" },
      { name: "Exit" },
      { name: "LogoutR" },
      { name: "Delete" },
      { name: "Substract" },
      { name: "Rating" },
      { name: "Search" },
      { name: "Touch" },
    ];

    routeName = routeSelector(randomRoutes);
    storagePoints(5);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  const handlerExitApp = () => {
    BackHandler.exitApp();
  }

  //Función cerrar sesión
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
    );
  };

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormalWMargin}>Busca el botón correcto y ten cuidado con el resto</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Suerte</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerExitApp}>Cerrar</Button>
        <Button style={styles.blueButton} mode='contained' onPress={randomRoute}>Cerrar</Button>
        <Button style={styles.blueButton} mode="contained" onPress={handlerSignOut}>Continuar</Button>
        <Button style={styles.redButton} mode="contained" onPress={() => storagePoints(1)}>+</Button>
        <Button style={styles.blueButton} mode="contained" onPress={() => storagePoints(-2)}>-</Button>
        <Button style={styles.redButton} mode="contained" onPress={() => storagePoints(2)}>-</Button>
        <Button style={styles.redButton} mode="contained" onPress={() => storagePoints(-1)}>+</Button>
        <Button style={styles.redButton} mode="contained" onPress={() => storagePoints(5)}>-</Button>
    </View>
  )
}