import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  query,
  where,
} from "firebase/firestore/lite";

const useUserData = ({ db, userData, getCurrentAuth }) => {
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    (async () => {
      if (userData.logged) {
        const uid = getCurrentAuth().currentUser.uid;
        const response = await getUserInformation(uid);

        setUserInformation({ ...response, uid });
      }
    })();
  }, [userData]);

  const getUserInformation = async (uid) => {
    // Armamos la referencia collection "users", del documento "uid"
    // { users: { uid: {} } }
    const userRef = doc(db, "users", uid);

    // Utilizamos la anterior referencia y obtenemos los datos
    const userSnap = await getDoc(userRef);

    // Devolvemos los datos encontrados, si no se encuentra retorna undefined
    return await userSnap.data();
  };

  const getBootcamp = async (uid, all = false) => {
    let result = [];

    // Obtiene la collection de Bootcamp
    // Ya sea obtener todos los bootcamp en general para el usuario
    // Ya sea obtener todos los bootcamp de una empresa en especifico
    try {
      const q = all
        ? // Todos los bootcamp
          collection(db, "bootcamps")
        : // Filtrado por uid
          query(collection(db, "bootcamps"), where("uidCreator", "==", uid));

      // Dependiendo del query, son los datos que se van a devolver
      const querySnapshot = await getDocs(q);

      // // Obtenemos los datos, los guardamos en un array y los retornamos
      // // En caso de no haber resultados se retorna []
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
    } catch (error) {}

    return result;
  };

  const postBootcamp = async (uidCreator, description) => {
    // addDoc ya adhiere un uid aleatorio de documento
    // Obtenemos la collection bootcamps y posteamos con los datos del parametro
    await addDoc(collection(db, "bootcamps"), {
      uidCreator,
      // title,
      description,
      createdAt: new Date().toISOString(),
    });
  };

  const getSubscription = async (uid, enterprise = false, all = false) => {
    let result = [];

    // Obtenemos las subscripciones, tenemos dos tipos
    // enterprise = true, devuelve los usuarios que se inscribieron a la bootcamp (uid empresa)
    // enterprise = false, devuelve las bootcamps que se inscribio un usuario (uid usuario)
    try {
      const q = all
        ? // Todos los bootcamp
          collection(db, "subscriptions")
        : // Filtrado por uid
          query(
            collection(db, "subscriptions"),
            where(enterprise ? "uidBootcamp" : "uidCreator", "==", uid)
          );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
    } catch (error) {}

    return result;
  };

  const postSubscription = async (uidCreator, uidBootcamp) => {
    // Posteamos una inscripcion en la collection subscriptions
    // uidCreator = quien lo creo
    // uidBootcamp = a que bootcamp se inscribio
    await addDoc(collection(db, "subscriptions"), {
      uidCreator,
      uidBootcamp,
      createdAt: new Date().toISOString(),
    });
  };

  const existSubscription = async (uidCreator, uidBootcamp) => {
    // Si existe una subscripcion de un usuario a una bootcamp
    // Se va documento por documento, y se chequea si:
    // El usuario es el mismo, y la bootcamp es la misma que pusimos en parametros
    const q = query(
      collection(db, "subscriptions"),
      where("uidCreator", "==", uidCreator),
      where("uidBootcamp", "==", uidBootcamp)
    );

    const querySnapshot = await getDocs(q);

    let count = 0;
    // Si yo obtengo en mi conteo que se encontro alguna referencia, significa que es true
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      count++;
    });

    return count > 0 ? true : false;
  };

  return {
    // States
    userInformation,

    // Functions
    getUserInformation,
    getBootcamp,
    postBootcamp,
    getSubscription,
    postSubscription,
    existSubscription,
  };
};

export default useUserData;
