import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import AlertDialog from "../components/Dialog/Dialog";
import { authContext } from "../context/appContext";

// Seccion que muestra las bootcamps que tiene una empresa
const Enterprise = (props) => {
    const { userData, getBootcamp, getSubscription, userInformation } = useContext(authContext);
    const [listInformation, setListInformation] = useState([]);

    useEffect(() => {
        (async () => {
            if (userData.logged) {
                if (userInformation.type && props.pathname === "/mybootcamp") {
                    // Obtenemos la bootcamp que tiene la empresa
                    const bootcamp = await getBootcamp(userInformation.uid);

                    // Seteamos la lista de bootcamp para hacer un re-render este componente
                    setListInformation(bootcamp);
                }
                else {
                    const subscription = await getSubscription(userInformation.uid, false);

                    setListInformation(subscription);
                }
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
                title="Cancelar inscripcion al bootcamp"
                text="¿ Quieres cancelar tu inscripcion ?"
            />
            {
                listInformation.map(bootcamp =>
                (<TextArea
                    key={bootcamp}
                    title={userInformation.usuario}
                    subtitle={userInformation.descripcion}
                    enterprise={userInformation.type}
                    handleOpen={handleOpen}
                    btnText="Cancelar"
                />))
            }
        </Container>
    )
}

export default Enterprise;