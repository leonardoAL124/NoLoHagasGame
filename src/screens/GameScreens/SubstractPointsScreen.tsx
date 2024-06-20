import React, { useEffect, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { stylesTextFont } from '../LoginScreen'
import { storagePoints } from '../../components/PointsCount'
import { RouteName } from '../../interfaces/routeName'
import { routeSelector } from '../../components/RandomRoute'

export const SubtractPointsScreen = () => {

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
      { name: "Rating" },
      { name: "Locate" },
      { name: "Search" },
      { name: "Touch" },
    ];
    
    routeName = routeSelector(randomRoutes);
    storagePoints(-1);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormal}>Sere sincero esto es solo para molestarte</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Cada vez que salga esta pantalla se te restara un punto</Text>
        <Text style={stylesTextFont.textNormalWMargin}>Estos son los que tienes actualmente:</Text>
        <Text style={stylesTextFont.textNormalWMargin}>{storagePoints(0)}</Text>
        <Button style={styles.button} mode='contained' onPress={randomRoute}>Continuar</Button>
    </View>
  )
}