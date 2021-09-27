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

// const firebaseConfig = {
//   apiKey: "AIzaSyAXz6FJnbXc6IyXxBlU2w_86cVAxD5-yik",
//   authDomain: "hackahub-8978e.firebaseapp.com",
//   projectId: "hackahub-8978e",
//   storageBucket: "hackahub-8978e.appspot.com",
//   messagingSenderId: "986160142604",
//   appId: "1:986160142604:web:82daccc556049b46dd5129",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCW4ygATsUJy4Wrq6pMOrCs7WZV3LjbejM",
  authDomain: "test-ad309.firebaseapp.com",
  projectId: "test-ad309",
  storageBucket: "test-ad309.appspot.com",
  messagingSenderId: "608444313408",
  appId: "1:608444313408:web:ed4623ed99c4f2aa1ad4a5",
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
          // ...userData,
          loading: false,
          logged: true,
          emailVerified: user.emailVerified,
        });
      } else {
        setUserData({ loading: false, logged: false, emailVerified: false });
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loguear un usuario
  const userLogin = async (email, password) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        error: false,
        credentials: credentials.user,
      };
    } catch (error) {
      return {
        error: true,
        errorCode: error.code,
        displayError: handleErrorCode(error.code),
      };
    }
  };

  // Registrar un usuario
  const userRegister = async (datos) => {
    try {
      // Registrar al usuario, en caso de error(ya existir) salta al catch
      const credentials = await createUserWithEmailAndPassword(
        auth,
        datos.email,
        datos.password
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
      console.log("asdsdasdasda");
      console.log({ ...datos, createdAt: new Date().toISOString() });
      await setDoc(usersCol, { ...datos, createdAt: new Date().toISOString() });

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
        displayError: handleErrorCode(error.code),
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
        displayError: handleErrorCode(error.code),
      };
    }
  };

  // Destruir la session del usuario
  const userLogout = () => {
    return auth.signOut();
  };

  // Handle de errores para firebase
  const handleErrorCode = (code) => {
    const errorCodes = {
      "auth/email-already-in-use":
        "Este email ya fue registrado por otro usuario",
      "auth/wrong-password": "Contraseña Invalida, Intente nuevamente",
      "auth/user-not-found": "Email no encontrado, Intente nuevamente",
      "auth/invalid-email": "Email Invalido, Intente nuevamente",
      "auth/weak-password": "La contraseña necesita tener minimo 6 caracteres",
      "auth/too-many-requests": "Espere un momento para volver a intentarlo",
    };

    // No hace falta break ya que se topa con return directamente
    // 'code' proviene del trycatch error.code en login/register y algun otro
    return errorCodes[code] || "Error Desconocido";
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
    setUserData,
    userSendPasswordRecover, // Nos permite enviar un link para recuperar la contraseña
    getDb, // Nos permite hacer peticiones al Firestore
    getCurrentAuth, // Obtenemos el getAuth()
  };
};

export default useFirebase;
