import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import Paper from '@mui/material/Paper';
import AlertDialog from "../components/Dialog/Dialog";
import { authContext } from "../context/appContext";

// const jsonData = [
//     {
//         usuario: 'Empresa 1',
//         descripcion: 'Esta es una descripcion'
//     },
//     {
//         usuario: 'Empresa 2',
//         descripcion: 'Esta es una descripcion'
//     },
//     {
//         usuario: 'Empresa 3',
//         descripcion: 'Esta es una sdescripcion'
//     },
//     {
//         usuario: 'Empresa 4',
//         descripcion: 'Esta es una ddescripcion'
//     },
//     {
//         usuario: 'Empresa 5',
//         descripcion: 'Esta es una adescripcion'
//     }
// ]

// Seccion que muestra las bootcamps que tiene una empresa
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

    const [open, setOpen] = useState(false);
    const [lastIndex, setLastIndex] = useState(null);

    const handleOpen = (index) => {
        setOpen(true);
        setLastIndex(index);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReject = () => {
        console.log("reject: " + lastIndex);
        setOpen(false);
    }

    const handleAccept = () => {
        console.log("accept: " + lastIndex);
        setOpen(false);
    }

    return (
        <Container maxWidth="xs">
             <AlertDialog 
                open={open} 
                handleReject={handleReject}
                handleAccept={handleAccept}
                handleClose={handleClose}
                title="Inscribirse al bootcamp"
                text="¿ Quieres inscribirte ?"
            />
            <Paper elevation={8} sx={{ p: 4 }}>
                {
                    listBootcamp.map(bootcamp => {
                        return (
                            <TextArea
                                key={bootcamp}
                                title={userInformation.usuario}
                                subtitle={userInformation.descripcion}
                                enterprise={userInformation.type}
                                btnText="Cancelar"
                            />
                        )
                    })
                }
            </Paper>
        </Container>
    )
}

export default Enterprise;