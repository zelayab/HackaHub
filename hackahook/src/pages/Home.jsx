// feed de Home enterprise con el modal new Bootcamp en el navbar

import { useContext, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import AlertDialog from "../components/Dialog/Dialog";

import { authContext } from "../context/appContext";

const jsonData = [
    {
        usuario: 'Empresa 1',
        descripcion: 'Esta es una descripcion'
    },
    {
        usuario: 'Empresa 2',
        descripcion: 'Esta es una descripcion'
    },
    {
        usuario: 'Empresa 3',
        descripcion: 'Esta es una sdescripcion'
    },
    {
        usuario: 'Empresa 4',
        descripcion: 'Esta es una ddescripcion'
    },
    {
        usuario: 'Empresa 5',
        descripcion: 'Esta es una adescripcion'
    }
]

// Seccion que muestra las bootcamps que tiene una empresa
const Home = () => {
    const { userInformation } = useContext(authContext);

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

    console.log(userInformation);

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
                jsonData.map((data, index) => {
                    return (
                        <TextArea
                            key={index}
                            index={index}
                            title={data.usuario}
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