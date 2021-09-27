// feed de Home enterprise con el modal new Bootcamp en el navbar

import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import AlertDialog from "../components/Dialog/Dialog";

import { authContext } from "../context/appContext";

// Seccion que muestra las bootcamp en general
const Home = () => {
    const { userData, userInformation, getBootcamp, getUserInformation } = useContext(authContext);
    const [listInformation, setListInformation] = useState([]);

    console.log("--------------------");
    console.log(listInformation);

    useEffect(() => {
        (async () => {
            if (userData.logged) {
                // Obtenemos TODAS las bootcamp
                const bootcamp = await getBootcamp(userInformation.uid, true);

                // Si nos devolvio alguna bootcamp
                let bootcampResult = [];

                for (let i = 0; i < bootcamp.length; i++) {
                    const userEnterprise = await getUserInformation(bootcamp[i].uidCreator);
                    if (userEnterprise !== 0) {
                        const enterpriseName = userEnterprise.usuario;
                        // Seteamos la lista de bootcamp para hacer un re-render este componente
                        // setListInformation();
                        bootcampResult.push({ ...bootcamp[i], enterpriseName });
                        setListInformation(bootcampResult);
                    }
                }

                // bootcampArray.forEach(async (bootcamp) => {
                //     const userEnterprise = await getUserInformation(bootcamp.uidCreator);
                //     if (userEnterprise !== 0) {
                //         const enterpriseName = userEnterprise.usuario;
                //         // Seteamos la lista de bootcamp para hacer un re-render este componente
                //         // setListInformation();
                //         console.log(bootcamp);
                //         bootcampResult.push({ ...bootcamp, enterpriseName });
                //         setListInformation(bootcampResult);
                //     }
                // })
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
        <Container fullWidth="xs">
            {userInformation.type ?
                <></>
                :
                <AlertDialog
                    open={open}
                    handleReject={handleReject}
                    handleAccept={handleAccept}
                    handleClose={handleClose}
                    title="Inscribirse al bootcamp"
                    text="¿ Quieres inscribirte ?"
                />
            }

            {
                listInformation.map((data, index) => {
                    return (
                        <TextArea
                            key={index}
                            index={index}
                            title={data.enterpriseName}
                            subtitle={data.descripcion}
                            enterprise={userInformation.type}
                            handleOpen={handleOpen}
                            btnText="Inscribirse"
                        />
                    )
                })
            }
        </Container>
    )
}


export default Home;