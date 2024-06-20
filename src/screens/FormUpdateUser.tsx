import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import firebase, { updateProfile, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { auth } from '../configs/firebaseConfig';
import styles from '../theme/styles';

//Interface - Usuario data
interface FormUser {
  name: string,
  phone: string,
}

//Interface - mensajes
interface MessageSnackbar {
  visible: boolean,
  message: string,
  color: string,
}

// Variable booleana
export let verification: boolean = false

export const FormUpdateUser = () => {

  // Expresiones regulares para verificar los campos
  let validate_number: RegExp = /^([0-9])*$/;
  let validate_name: RegExp = /^[a-zA-Z\s]+$/;

  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
    phone: '',
  });

  const [showMessage, setShowMessage] = useState<MessageSnackbar>({
    visible: false,
    message: '',
    color: 'gray',
  });

  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  //hook useState: manipular el modal perfil
  const [showModal, setShowModal] = useState<boolean>(false);

  // Hook useState: guardar el código de verificación
  const [verificationCode, setVerificationCode] = useState<string>('');

  // Hook useState: guardar el id de verificación
  const [verificationId, setVerificationId] = useState<string | null>(null);

  // Hook useRef: verificar el uso del recaptcha
  const recaptchaVerifier = useRef(null);

  //hook navegación
  const navigation = useNavigation();

  //hook useEffect: capturar la data del usuario autenticado
  useEffect(() => {
    setUserAuth(auth.currentUser);
    setFormUser({
      name: auth.currentUser?.displayName ?? "",
      phone: auth.currentUser?.phoneNumber ?? "",
    })
  }, [])

  // Función que cambie los valores del formUser
  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value })
  }

  // Función para cambiar el número de teléfono al formato de Firebase
  const formatPhoneNumber = (phoneNumber: string): string => {
    return `+593${phoneNumber}`;
  };

  // Función verificar número de teléfono
  const handlerVerifyPhoneNumber = async (phoneNumber: string) => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      if (recaptchaVerifier.current) {
        const provider = new PhoneAuthProvider(auth);
        const verificationId = await provider.verifyPhoneNumber(formattedPhoneNumber, recaptchaVerifier.current);
        setVerificationId(verificationId);
        setShowMessage({
          visible: true,
          message: 'Se ha enviado un código de verificación al número proporcionado',
          color: '#2D572C',
        });
        setShowModal(true);
      } else {
        setShowMessage({
          visible: true,
          message: 'Se ha producido un error con el reCaptcha',
          color: '#8B0000',
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  // Función confirmar código de verificación
  const handlerConfirmVerificationCode = async () => {
    try {
      if (verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        const userCredential = await signInWithCredential(auth, credential);
        setUserAuth(userCredential.user);
        setShowMessage({
          visible: true,
          message: 'Número de teléfono verificado exitosamente!',
          color: '#2D572C',
        });
        setShowModal(false);
        navigation.dispatch(CommonActions.navigate({ name: 'Welcome' }));
        verification = true;
      }
    } catch (ex) {
      console.error(ex);
      setShowMessage({
        visible: true,
        message: 'Hubo un problema al verificar el número de teléfono',
        color: '#8B0000',
      });
    }
  };

  // Función - actualizar la data del usuario autenticado
  const handlerUpdateUser = async () => {
    if (!formUser.name || !formUser.phone) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos!',
        color: '#8B0000',
      });
      return;
    } else if (!validate_name.test(formUser.name)) {
      setShowMessage({
        visible: true,
        message: 'Ingrese un nombre válido!',
        color: '#8B0000',
      });
      return;
    } else if (!validate_number.test(formUser.phone) || formUser.phone.length < 7) {
      setShowMessage({
        visible: true,
        message: 'Ingrese un número válido!',
        color: '#8B0000',
      });
      return;
    } else {
      console.log(auth.currentUser);

      if (formUser.phone !== userAuth!.phoneNumber) {
        await handlerVerifyPhoneNumber(formUser.phone);
        await updateProfile(userAuth!, {
          displayName: formUser.name,
        });
      }
    }
  }

  return (
    <View style={styles.root}>
      <Text style={{ margin: 10, fontFamily: 'Permanent', fontSize: 26, color: 'white' }}>Realmente ingresaste... si no te importa:</Text>
      <TextInput
        style={styles.inputs}
        mode='flat'
        label='Escribe tu nombre'
        textColor='#fff'
        activeUnderlineColor='#fff'
        underlineColor='#fff'
        value={formUser.name}
        onChangeText={(value) => handlerSetValues('name', value)} />
      <TextInput
        style={styles.inputs}
        mode='flat'
        label='Escribe tu número de teléfono'
        textColor='#fff'
        activeUnderlineColor='#fff'
        underlineColor='#fff'
        keyboardType='number-pad'
        value={formUser.phone}
        onChangeText={(value) => handlerSetValues('phone', value)} />
      <Button style={styles.button} mode='contained' onPress={handlerUpdateUser}>Guardar información</Button>
      <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant='headlineMedium' style={{ margin: 10, fontFamily: 'Permanent', fontSize: 26, color: 'white' }}>Verificación</Text>
            <View style={styles.iconEnd}>
              <IconButton
                icon='close-circle-outline'
                size={20}
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            style={styles.inputs}
            mode='flat'
            label='Escribe el código de verificación'
            textColor='#fff'
            activeUnderlineColor='#fff'
            underlineColor='#fff'
            keyboardType='number-pad'
            value={verificationCode}
            onChangeText={(value) => setVerificationCode(value)} />
          <Button style={styles.buttonModal} mode='contained' onPress={handlerConfirmVerificationCode}>Verificar</Button>
        </Modal>
      </Portal>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}>
        {showMessage.message}
      </Snackbar>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />
    </View>
  )
}
