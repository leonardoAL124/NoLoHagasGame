import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import styles from '../theme/styles';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { FormUpdateUser } from '../screens/GameScreens/FormUpdateUser';

const Stack = createStackNavigator();

export const Navigation = () => {

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            }
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={25} animating={true} color={MD2Colors.red800} />
                </View>
            ) : (
                <Stack.Navigator>
                    {
                        !isAuth ?
                            <>
                                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                                <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
                            </>
                            :
                            <Stack.Screen name="Home" options={{ headerShown: false }} component={FormUpdateUser} />
                    }
                </Stack.Navigator>
            )}
        </>
    )
}