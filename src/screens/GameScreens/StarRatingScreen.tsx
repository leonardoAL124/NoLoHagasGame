import { Rating } from '@kolking/react-native-rating';
import React, { useCallback, useState } from 'react'
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../../theme/styles';
import { stylesTextFont } from '../LoginScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RouteName } from '../../interfaces/routeName';
import { routeSelector } from '../../components/RandomRoute';
import { storagePoints } from '../../components/PointsCount';

export const StarRatingScreen = () => {

  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating],
  );

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
      { name: "Locate" },
      { name: "Search" },
      { name: "Touch" },
    ];
    
    routeName = routeSelector(randomRoutes);
    storagePoints(rating);
    navigation.dispatch(CommonActions.navigate({ name: routeName }));
  }

  return (
    <View style={styles.root}>
      <Text style={stylesTextFont.textNormal}>Como lo he hecho hasta ahora?</Text>
      <Rating size={25} rating={rating} onChange={handleChange} />
      <Button style={styles.button} mode='contained' onPress={randomRoute}>Continuar</Button>
    </View>
  )
}
