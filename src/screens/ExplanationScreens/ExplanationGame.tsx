import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'

export const ExplanationGame = () => {

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
      { name: "Locate" },
      { name: "Search" },
      { name: "Touch" },
    ];
    
    routeName = routeSelector(randomRoutes);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormalWMargin}>Para empezar, hay una serie de pantallas cada una con una prueba</Text>
      <Text style={stylesTextFont.textNormal}>Cada prueba tendra una calificación entre 1 y 2... Yo seré quien califique por supuesto</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Pero no todo es facil, existen muchos botones trampa, asegurate de no caer en ellos...</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Para ganar tienes que obtener un total de 10 puntos y espero que lleves la cuenta</Text>
      <Button style={styles.button} mode='contained' onPress={randomRoute}>Continuar</Button>
    </View>
  )
}