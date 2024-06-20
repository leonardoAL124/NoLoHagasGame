import React from 'react'
import { View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import styles from '../../theme/styles'
import { stylesTextFont } from '../LoginScreen'
import { storagePoints } from '../../components/PointsCount'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { routeSelector } from '../../components/RandomRoute'
import { RouteName } from '../../interfaces/routeName'

export const TouchAnimalScreen = () => {

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
    ];
    
    routeName = routeSelector(randomRoutes);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  const pressCat = () => {
    storagePoints(1);
    randomRoute();
  }

  const pressDog = () => {
    storagePoints(2);
    randomRoute();
  }

  return (
    <View style={styles.root}>
        <Text style={stylesTextFont.textNormalWMargin}>Escoje al perro:</Text>
        <View style= {styles.header}>
            <IconButton icon="cat" iconColor= "gray" size={60} onPress={pressCat} />
            <IconButton icon="dog" iconColor= "gray" size={60} onPress={pressDog} />
        </View>
    </View>
  )
}
