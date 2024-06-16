import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Routes } from './WelcomeGame'
import { stylesTextFont } from '../LoginScreen'
import { signOut } from 'firebase/auth'
import { auth } from '../../configs/firebaseConfig'

export const LogoutReverseScreen = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";
    const randomNumber = Math.floor(Math.random() * 3);

    const randomRoutes: Routes[] = [
      { name: "Press" },
      { name: "Logout" },
      { name: "Exit" },
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

  //Función cerrar sesión
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(CommonActions.reset({index:0, routes: [{name: 'Login'}]}));
}

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>Vamos a realizar una prueba de confianza</Text>
        <Text style={stylesTextFont.textNormal}>Lo único que tienes que hacer es aplastar el botón rojo</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerSignOut}>Confiar</Button>
        <Button style={styles.blueButton} mode='contained' onPress={randomRoute}>No Confiar</Button>
        <Text style={stylesTextFont.textNormal}>Solo confia...</Text>
    </View>
  )
}