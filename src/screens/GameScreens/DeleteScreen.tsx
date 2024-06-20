import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { deleteUser } from 'firebase/auth'
import { auth } from '../../configs/firebaseConfig'
import { storagePoints } from '../../components/PointsCount'
import { routeSelector } from '../../components/RandomRoute'
import { RouteName } from '../../interfaces/routeName'

export const DeleteScreen = () => {

  const user = auth.currentUser;

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

  const handlerDeleteUser = () => {
    try {
        deleteUser(user!);
        navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } catch (ex) {
        console.log(ex);
        randomRoute();
    }
  }

  const randomRoute = () => {

    let routeName: string = "";

    const randomRoutes: RouteName[] = [
      { name: "Press" },
      { name: "Logout" },
      { name: "Exit" },
      { name: "LogoutR" },
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
        <Text style={stylesTextFont.textNormalWMargin}>Estoy un poco cansado el día de hoy</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Es solo por tí que tengo q estar aquí...</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Que te parece si simplemente te vas?</Text>
        <Button style={styles.redButton} mode='contained' onPress={handlerDeleteUser}>Irse</Button>
        <Text style={stylesTextFont.textNormal}>Solo vete, no pasa nada, sin ninguna consecuencia...</Text>
        <Button disabled={showButton} style={styles.blueButton} mode='contained' onPress={randomRoute}>Continuar..</Button>
    </View>
  )
}