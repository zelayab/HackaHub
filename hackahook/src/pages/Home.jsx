// feed de Home enterprise con el modal new Bootcamp en el navbar

import { useContext } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"

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

    return (
        <Container container fullWidth="xs">
            {
                jsonData.map(data => {
                    return (
                        <TextArea
                            key={data}
                            title={data.usuario}
                            subtitle={data.descripcion}
                            enterprise={userInformation.type}
                            btnText="Inscribirse"
                        />
                    )
                })
            }
        </Container>
    )
}


export default Home;