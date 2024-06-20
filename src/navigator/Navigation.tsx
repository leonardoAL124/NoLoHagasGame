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
import { WelcomeGame } from '../screens/ExplanationScreens/WelcomeGame';
import { PressButton } from '../screens/GameScreens/PressButton';
import { LogoutScreen } from '../screens/GameScreens/LogoutScreen';
import { ExitScreen } from '../screens/GameScreens/ExitScreen';
import { LogoutReverseScreen } from '../screens/GameScreens/LogoutReverseScreen';
import { ExplanationGame } from '../screens/ExplanationScreens/ExplanationGame';
import { DeleteScreen } from '../screens/GameScreens/DeleteScreen';
import { FormUpdateUser, verification } from '../screens/FormUpdateUser';
import { SubtractPointsScreen } from '../screens/GameScreens/SubstractPointsScreen';
import { WinGameScreen } from '../screens/WinGameScreen';
import { StarRatingScreen } from '../screens/GameScreens/StarRatingScreen';
import { LocateButtonScreen } from '../screens/GameScreens/LocateButtonScreen';
import { SearchButtonScreen } from '../screens/GameScreens/SearchButtonScreen';
import { TouchAnimalScreen } from '../screens/GameScreens/TouchAnimalScreen';

const Stack = createStackNavigator();

// Interface - Rutas
interface Routes {
    name: string;
    screen: () => JSX.Element; // elemento JSX
    headerShow?: boolean;
}

export const Navigation = () => {

    // Arreglo que contenga las rutas si el usuario no esta autenticado
    const routes: Routes[] = [
        { name: "Login", screen: LoginScreen },
        { name: "Register", screen: RegisterScreen },
        // Ruta de verificación
        { name: "Verification", screen: FormUpdateUser },
        // Rutas accesibles luego del login y la verificación
        // Rutas de Explicación 
        { name: "Welcome", screen: WelcomeGame },
        { name: "Explanation", screen: ExplanationGame },
        // Rutas de Juego
        { name: "Exit", screen: ExitScreen },
        { name: "LogoutR", screen: LogoutReverseScreen },
        { name: "Press", screen: PressButton },
        { name: "Logout", screen: LogoutScreen },
        { name: "Delete", screen: DeleteScreen },
        { name: "Substract", screen: SubtractPointsScreen },
        { name: "Rating", screen: StarRatingScreen },
        { name: "Locate", screen: LocateButtonScreen },
        { name: "Search", screen: SearchButtonScreen },
        { name: "Touch", screen: TouchAnimalScreen },
        // Ruta de ganador del juego
        { name: "Win", screen: WinGameScreen },
    ];

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        initialRouteName();
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            }
            setIsLoading(false);
        })
    }, []);

    let name: string = '';

    const initialRouteName = () => {
        
        if (isAuth && verification) {
            name = 'Welcome';
        } else if (!isAuth){
            name = 'Login';
        } else if (!verification){
            name = 'Verification';
        }
    }

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={25} animating={true} color={MD2Colors.red800} />
                </View>
            ) : (
                <Stack.Navigator initialRouteName={ name }>
                    {
                        routes.map((item, index) => (
                            <Stack.Screen
                                key= {index}
                                name= {item.name}
                                options={{headerShown: false}}
                                component={item.screen}
                            />
                        ))
                    }
                </Stack.Navigator>
            )}
        </>
    )
}