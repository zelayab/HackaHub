// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import FirebaseUtils from "../utils/FirebaseUtils";

const firebaseConfig = {
  apiKey: "AIzaSyAXz6FJnbXc6IyXxBlU2w_86cVAxD5-yik",
  authDomain: "hackahub-8978e.firebaseapp.com",
  projectId: "hackahub-8978e",
  storageBucket: "hackahub-8978e.appspot.com",
  messagingSenderId: "986160142604",
  appId: "1:986160142604:web:82daccc556049b46dd5129",
};

const useFirebase = () => {
  // Firebase Initialize
  initializeApp(firebaseConfig); // Firebase
  const db = getFirestore(); // Firestore

  const auth = getAuth(); // Firebase/auth

  const [userData, setUserData] = useState({
    loading: true, // Verificar si esta en proceso de autentificado (fetching)
    logged: false, // Verificar si esta logueado
    emailVerified: false, // Verificar si verifico el email
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          logged: true,
          loading: false,
          emailVerified: user.emailVerified,
        });
      } else {
        setUserData({ logged: false, loading: false, emailVerified: false });
      }
    });

    return () => unsubscribe();
  }, []);

  // Loguear un usuario
  const userLogin = async (email, password) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUserData({
        ...userData,
        emailVerified: credentials.user.emailVerified,
      });

      return {
        error: false,
        credentials: credentials.user,
      };
    } catch (error) {
      return {
        error: true,
        errorCode: error.code,
        displayError: FirebaseUtils.handleErrorCode(error.code),
      };
    }
  };

  // Registrar un usuario
  const userRegister = async (email, firstName, lastName, password) => {
    try {
      // Registrar al usuario, en caso de error(ya existir) salta al catch
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Referenciamos (ejemplo de como quedaria)
      //   {
      //       "users": {
      //           credentials.user.uid: {
      //               "email": "josueemanuelalonso@gmail.com",
      //                "firstName": "Josue",
      //                "lastName": "Alonso",
      //                "createdAt": "2021-09-25T23:45:41.306Z"
      //           }
      //       }
      //   }
      // Obtenemos la colección('users') y el documento(uid)
      const usersCol = doc(db, "users", credentials.user.uid);

      // Creamos y colocamos contenido con la referencia creada
      await setDoc(usersCol, {
        email: credentials.user.email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      });

      // Enviar verificación al email
      await sendEmailVerification(auth.currentUser);

      return {
        error: false,
        credentials: credentials.user,
      };
    } catch (error) {
      return {
        error: true,
        errorCode: error.code,
        displayError: FirebaseUtils.handleErrorCode(error.code),
      };
    }
  };

  // Recuperar Contraseña
  const userSendPasswordRecover = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        errorCode: error.code,
        displayError: FirebaseUtils.handleErrorCode(error.code),
      };
    }
  };

  // Destruir la session del usuario
  const userLogout = () => {
    return auth.signOut();
  };

  // Getters/Setters
  const getDb = () => {
    return db;
  };
  const getCurrentAuth = () => {
    return auth;
  };

  return {
    userLogin, // Nos permite acceder
    userRegister, // Nos permite registrarnos
    userLogout, // Nos permite salir de la cuenta
    userData, // Nos permite ver si esta logueado(propiedad user) o obtener datos
    userSendPasswordRecover, // Nos permite enviar un link para recuperar la contraseña
    getDb, // Nos permite hacer peticiones al Firestore
    getCurrentAuth, // Obtenemos el getAuth()
  };
};

export default useFirebase;
