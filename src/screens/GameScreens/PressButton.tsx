import React, { useEffect, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { storagePoints } from '../../components/PointsCount'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'

export const PressButton = () => {

  //hook useState para cambiar el valor del "disabled"
  const [showButton, setShowButton] = useState<boolean>(true);

  //hook useEffect para ejecutar el mostrar boton de continuar
  useEffect(() => {
    setTimeout(setValue, 60000)
  }, [])

  //función para cambiar el valor del disabled del botón
  const setValue = () => {
    setShowButton(false)
  }

  //hook navegación
  const navigation = useNavigation();

  const handlerExitApp = () => {
    BackHandler.exitApp();
  }

  const randomRoute = () => {

    let routeName: string = "";

    const randomRoutes: RouteName[] = [
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
    storagePoints(1);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>En esta prueba, me gustaria simplemente esperar</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Ves el boton de abajo? Bueno... no deberias presionarlo</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerExitApp}>Presionalo</Button>
        <Text style={stylesTextFont.textNormal}>Tan simple como tener paciencia y esperar...</Text>
        <Button disabled={showButton} style={styles.blueButton} mode='contained' onPress={randomRoute}>Continuar</Button>
    </View>
  )
}
