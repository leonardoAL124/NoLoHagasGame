import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Routes } from './WelcomeGame'
import { stylesTextFont } from '../LoginScreen'

export const PressButton = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";
    const randomNumber = Math.floor(Math.random() * 3);

    const randomRoutes: Routes[] = [
      { name: "Logout" },
      { name: "Exit" },
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

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>En esta prueba, me gustaria simplemente no hacer nada</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Ves el boton de abajo? Bueno... no quiero que lo pulses</Text>
        <Button style={styles.button} mode='contained' onPress={randomRoute}>Presionalo</Button>
        <Text style={stylesTextFont.textNormal}>Tan simple como tener paciencia y esperar a que no pase nada...</Text>
    </View>
  )
}
