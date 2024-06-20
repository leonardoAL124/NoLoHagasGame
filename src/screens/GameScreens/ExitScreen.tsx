import React from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { storagePoints } from '../../components/PointsCount'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'

export const ExitScreen = () => {

  //hook navegación
  const navigation = useNavigation();

  const randomRoute = () => {

    let routeName: string = "";

    const randomRoutes: RouteName[] = [
      { name: "Press" },
      { name: "Logout" },
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

  const handlerExitApp = () => {
    BackHandler.exitApp();
  }

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>Te dire lo que va a pasar</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Este boton hace que la aplicación se cierre</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerExitApp}>Cerrar</Button>
        <Text style={stylesTextFont.textNormal}>Este en cambio hace que continues a la siguiente pantalla</Text>
        <Button style={styles.blueButton} mode='contained' onPress={randomRoute}>Continuar</Button>
        <Text style={stylesTextFont.textNormal}>...o era al revés?</Text>
    </View>
  )
}