import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'

// Interface - Rutas
export interface Routes {
  name: string,
}

export const WelcomeGame = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";
    const randomNumber = Math.floor(Math.random() * 4);

    const randomRoutes: Routes[] = [
      { name: "Press" },
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
    } else if (randomNumber == 3) {
      routeName = randomRoutes[3].name;
    }
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormal}>No tuviste problema con ingresar tu información... interesante</Text>
      <Text style={stylesTextFont.textNormal}>Ya que esta aquí te doy la bienvenida a este "juego"</Text>
      <Text style={stylesTextFont.textNormalWMargin}>A partir de ahora todas las acciones que hagas seran vistas y juzgadas por mi</Text>
      <Button style={styles.button} mode='contained' onPress={randomRoute}>Continuar...</Button>
    </View>
  )
}
