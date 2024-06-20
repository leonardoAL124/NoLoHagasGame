import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import styles from '../theme/styles'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { setAcum } from '../components/PointsCount'
import { verification } from './FormUpdateUser'

//Interface - mensajes
interface MessageSnackbar {
    visible: boolean,
    message: string,
    color: string,
}

//Interface - Formulario Login
interface FormLogin {
    email: string,
    password: string,
}

//Interface - ocultar/mostrar contraseña
interface HiddenPassword {
    icon: string,
    secure: boolean,
}

export const LoginScreen = () => {

    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: '',
    });

    const navigation = useNavigation()

    const [hiddenPass, setHiddenPass] = useState<HiddenPassword>({
        icon: 'eye',
        secure: true
    });

    const [showMessage, setShowMessage] = useState<MessageSnackbar>({
        visible: false,
        message: '',
        color: 'gray',
    });

    const handlerSetValues = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value });
    };

    const handlerLogin = async () => {

        let validate: boolean = false;
        let emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        let email: string = String(formLogin.email);
        let password_length: number = formLogin.password.length;

        if (!formLogin.email || !formLogin.password) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos!',
                color: '#8B0000',
            });
            return;
        } else if (password_length < 6) {
            setShowMessage({
                visible: true,
                message: 'La contraseña necesita al menos 6 caracteres!',
                color: '#8B0000',
            });
            validate = true;
            return;
        } else if (!emailRegex.test(email)) {
            setShowMessage({
                visible: true,
                message: 'Ingrese un correo valido!',
                color: '#8B0000',
            });
            validate = true;
            return;
        }

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password,
            );
            if (verification) {
                navigation.dispatch(CommonActions.navigate({ name: 'Welcome' }));
            } else {
                navigation.dispatch(CommonActions.navigate({ name: 'Verification' }));
            }
            //Reiniciar el valor del acumulador cada vez que se logea el usuario
            setAcum();
            console.log(response);
        } catch (ex) {
            if (!validate) {
                setShowMessage({
                    visible: true,
                    message: 'Usuario y/o contraseña incorrecta!',
                    color: '#8B0000'
                })
                console.log(ex);
            } else { }
        }
    }

    // Funcion - Ocultar Contraseña
    const hiddenPassword = () => {
        if (hiddenPass.icon == "eye-off") {
            setHiddenPass({
                icon: 'eye',
                secure: true,
            });
        } else {
            setHiddenPass({
                icon: 'eye-off',
                secure: false,
            });
        }
    }

    return (
        <View style={styles.root}>
            <Text style={stylesTextFont.textNormal}>Inicio de Sesión? Porque un juego necesita eso...</Text>
            <TextInput
                mode="flat"
                label="Email"
                placeholder="Escriba su correo"
                keyboardType='email-address'
                textColor='#fff'
                activeUnderlineColor='#fff'
                underlineColor='#fff'
                style={styles.inputs}
                onChangeText={(value) => handlerSetValues('email', value)}
            />
            <TextInput
                mode="flat"
                label="Contraseña"
                placeholder="Escriba su contraseña"
                secureTextEntry={hiddenPass.secure}
                textColor='#fff'
                activeUnderlineColor='#fff'
                underlineColor='#fff'
                right={<TextInput.Icon icon={hiddenPass.icon} onPress={hiddenPassword} />}
                style={styles.inputs}
                onChangeText={(value) => handlerSetValues('password', value)}
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={handlerLogin}
            >
                Iniciar Sesión
            </Button>
            <Text
                style={stylesTextFont.textLitle}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                Quiza quieras ...registrarte?
            </Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </View>
    )
}

export const stylesTextFont = StyleSheet.create({
    textLitle: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Permanent',
    },
    textNormal: {
        fontFamily: 'Permanent',
        fontSize: 26,
        color: '#fff',
    },
    textNormalWMargin: {
        fontFamily: 'Permanent',
        fontSize: 26,
        color: '#fff',
        marginLeft: 15,
    },
});