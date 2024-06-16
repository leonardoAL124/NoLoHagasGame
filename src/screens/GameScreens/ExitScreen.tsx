import React from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Routes } from './WelcomeGame'
import { stylesTextFont } from '../LoginScreen'

export const ExitScreen = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";
    const randomNumber = Math.floor(Math.random() * 3);

    const randomRoutes: Routes[] = [
      { name: "Press" },
      { name: "Logout" },
      { name: "LogoutR" },
    ];
    if (randomNumber == 0) {
      routeName = randomRoutes[0].name;
    } else if (randomNumber == 1) {
      routeName = randomRoutes[1].name;
    } else if (randomNumber == 2) {
      routeName = randomRoutes[2].name;
    }
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  const handlerExitApp = () => {
    BackHandler.exitApp();
  }

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>Esta vez te dire lo que va a pasar</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Este boton hace que la aplicación se cierre</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerExitApp}>Cerrar</Button>
        <Text style={stylesTextFont.textNormal}>Este en cambio hace que continues a la siguiente pantalla</Text>
        <Button style={styles.blueButton} mode='contained' onPress={randomRoute}>Continuar</Button>
        <Text style={stylesTextFont.textNormal}>...o era al revés?</Text>
    </View>
  )
}