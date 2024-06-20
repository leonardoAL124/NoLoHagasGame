import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'
import { storagePoints } from '../../components/PointsCount'
import styles from '../../theme/styles'
import { stylesTextFont } from '../LoginScreen'

export const SearchButtonScreen = () => {

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
      { name: "Touch" },
    ];
    
    routeName = routeSelector(randomRoutes);
    storagePoints(1);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormalWMargin}>Acabo de perder el botón que hacemos?</Text>
      <Text style={stylesTextFont.textNormalWMargin}>Lo voy a reemplazar con una serie de texto de algún libro que encuentre</Text>
      <Text style={stylesTextFont.textNormalWMargin}>
        Entretanto la sólida nave en su curso ligero
        se enfrentó a las Sirenas: un soplo feliz la impelía
        mas de pronto cesó aquella brisa, una calma profunda
        se sintió alrededor: algún dios alisaba las olas.
        Levantáronse entonces mis hombres, 
        <Text style={stylesTextFont.textNormal} onPress={randomRoute}> plegaron </Text>
        la vela, la dejaron caer al fondo del barco y, sentándose al remo,
        blanqueaban de espumas el mar con las palas pulidas.</Text>
    </View>
  )
}