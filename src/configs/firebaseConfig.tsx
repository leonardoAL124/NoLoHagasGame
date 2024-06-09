// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9dEdSunciiSoAon2TP5AE1w51PbBeq9s",
  authDomain: "nolohagas-c93e2.firebaseapp.com",
  projectId: "nolohagas-c93e2",
  storageBucket: "nolohagas-c93e2.appspot.com",
  messagingSenderId: "610305431069",
  appId: "1:610305431069:web:06290dc8eda1c444c5d8f4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});