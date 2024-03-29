import { createContext } from 'react';

import useFirebase from '../hooks/useFirebase';
import useUserData from '../hooks/useUserData';

const authContext = createContext({});

// Esto esta integrado en index.js, el nivel más alto de la web
const Context = (props) => {
    // Utilizado como acortación a props.children
    // Obtengo todo lo que esta dentro de la etiqueta/componente mismo
    // <Context> -> ESTO <- </Context> (se usa mas para envolver contenido)
    const { children } = props;

    // Extraigo todas las funciones que me provee el hook
    const hookFirebase = useFirebase();

    const db = hookFirebase.getDb();

    const hookUserData = useUserData({ ...hookFirebase, db });

    return (
        // Decimos que hookFirebase va a estar dentro de este contexto
        // para obtenerlo luego
        <authContext.Provider value={{ ...hookFirebase, ...hookUserData }}>
            {children}
        </authContext.Provider >
    )
}

export { Context, authContext };