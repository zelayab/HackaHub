import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import Paper from '@mui/material/Paper';
import { authContext } from "../context/appContext";


const Enterprise = () => {
    const { userData, getBootcamp, userInformation } = useContext(authContext);
    const [listBootcamp, setListBootcamp] = useState([]);

    useEffect(() => {
        (async () => {
            if (userData.logged) {
                // Obtenemos la bootcamp que tiene la empresa
                const bootcamp = await getBootcamp(userInformation.uid);

                // Seteamos la lista de bootcamp para hacer un re-render este componente
                setListBootcamp(bootcamp);
            }
        })();
        // [userData] significa que cada vez que el state 'userData' cambie, se refresca este useEffect
        // Esto es porque al principio userData contiene un logged false, y al cambiar a true ejecutamos el que si va
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <Container container fullWidth="xs">
            <Paper elevation={8} sx={{ p: 4 }}>
                {
                    listBootcamp.map(bootcamp => {
                        return <TextArea key={bootcamp} title={userInformation.usuario} subtitle={userInformation.descripcion} />
                    })
                }
            </Paper>
        </Container>
    )
}


export default Enterprise;