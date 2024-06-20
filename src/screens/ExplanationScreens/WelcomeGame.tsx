import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'

export const WelcomeGame = () => {

  //hook navegación
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormal}>No tuviste problema con ingresar tu información...</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Bueno, ya que estas aquí te doy la bienvenida a este "juego"</Text>
      <Text style={stylesTextFont.textNormalWMargin}>A partir de ahora todas las acciones que hagas seran vistas y calificadas por mi</Text>
      <Text style={stylesTextFont.textNormalWMargin}>A partir de ahora todas las acciones que hagas seran vistas y calificadas por mi</Text>
      <Button style={styles.button} mode='contained' onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Explanation' }))}>Continuar</Button>
    </View>
  )
}
