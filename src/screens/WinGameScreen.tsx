import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { CommonActions, useNavigation } from '@react-navigation/native'
import styles from '../theme/styles'
import { stylesTextFont } from './LoginScreen'
import { deleteUser } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'

export const WinGameScreen = () => {

    const user = auth.currentUser;

  //hook navegación
  const navigation = useNavigation();

  const handlerDeleteUser = () => {
    try {
        deleteUser(user!);
        navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } catch (ex) {
        console.log(ex);
        navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    }
  }

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormal}>Felicidades!!!</Text>
      <Text style={stylesTextFont.textNormalWMargin}>No esperaba que lo lograras, la verdad yo no lo hubiera hecho</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Una última duda, que se siente haber gastado horas de tu vida para llegar aquí?</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Sabes qué? Te hare un favor, solo vete, mira el cielo, respira el aire, toca el pasto y NO VUELVAS</Text>
      <Button style={styles.button} mode='contained' onPress={handlerDeleteUser}>Salir</Button>
    </View>
  )
}