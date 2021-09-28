import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import AlertDialog from "../components/Dialog/Dialog";
import { authContext } from "../context/appContext";

// Seccion que muestra las bootcamps que tiene una empresa
const Enterprise = (props) => {
    const { userData, getUserInformation, userInformation, getBootcamp, getSubscription, getBootcampInfo, deleteSubscription } = useContext(authContext);
    const [listInformation, setListInformation] = useState([]);
    const [open, setOpen] = useState(false);
    const [lastIndex, setLastIndex] = useState(null);

    const getBootcamps = async () => {
        if (userData.logged) {
            if (userInformation.uid !== undefined) {
                if (props.pathname === "/mybootcamp") {
                    // Obtenemos la bootcamp que tiene la empresa
                    const bootcamp = await getBootcamp(userInformation.uid);

                    for (let i = 0; i < bootcamp.length; i++) {
                        const resEnterprise = await getUserInformation(bootcamp[i].uidCreator);
                        bootcamp[i] = {
                            ...bootcamp[i], ...{ usuario: resEnterprise.usuario }
                        };
                    }

                    // Seteamos la lista de bootcamp para hacer un re-render este componente
                    setListInformation(bootcamp);
                }
                else if (props.pathname === "/subscriptions") {
                    let subscription = await getSubscription(userInformation.uid, false);

                    for (let i = 0; i < subscription.length; i++) {
                        const resBootcamp = await getBootcampInfo(subscription[i].uidBootcamp);
                        const resEnterprise = await getUserInformation(resBootcamp.uidCreator);

                        subscription[i] = {
                            ...subscription[i], ...{ usuario: resEnterprise.usuario, descripcion: resBootcamp.descripcion }
                        };
                    }

                    setListInformation(subscription);
                }
            }
        }
    };

    useEffect(() => {
        getBootcamps();
        // [userData] significa que cada vez que el state 'userData' cambie, se refresca este useEffect
        // Esto es porque al principio userData contiene un logged false, y al cambiar a true ejecutamos el que si va
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, userInformation]);


    const handleOpen = (index) => {
        setOpen(true);
        setLastIndex(index);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReject = () => {
        setOpen(false);
    }

    const handleAccept = () => {
        setOpen(false);
        const data = listInformation[lastIndex];
        deleteSubscription(userInformation.uid, data.uidBootcamp);
        setListInformation(
            listInformation.filter(info => info.uidBootcamp === data.uidBootcamp)
        );
    }

    // Dots
    const handleEditar = (descripcion) => {
        console.log("increiblemente esto esta bug, no pasa de dotsbootcamp a enterprise...")
        console.log(descripcion);
    }

    const handleBorrar = () => {
        console.log('borrar button');
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
                listInformation.map((bootcamp, index) =>
                (<TextArea
                    key={index}
                    index={index}
                    title={bootcamp.usuario}
                    subtitle={bootcamp.descripcion}
                    enterprise={userInformation.type}
                    handleOpen={handleOpen}
                    handleEditar={handleEditar}
                    handleBorrar={handleBorrar}
                    showEdition={true}
                    btnText="Cancelar"
                />))
            }
        </Container>
    )
}

export default Enterprise;