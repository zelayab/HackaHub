// feed de Home enterprise con el modal new Bootcamp en el navbar

import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"

import usersService from "../services/users";

import { authContext } from "../context/appContext";

// Seccion que muestra las bootcamps que tiene una empresa
const Home = () => {
    const enterprise = false;
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
    // const [bootcamp, setBootcamp] = useState([]);
    // const [usuario, setUsuario] = useState('');
    // const { getCurrentAuth, getDb } = useContext(authContext);

    // useEffect(() => {
    //     const db = getDb();
    //     const uid = getCurrentAuth().currentUser.uid;

    //     setUsuario(usersService.getUserInformation(db, uid).usuario);

    //     const response = usersService.getBootcamp(db, uid, false).then(data => {
    //         setBootcamp(data);
    //         console.log(data);
    //     });
    // }, []);

   

       
    // console.log('bootcamp data: ' + bootcamp);


    return (
    <Container container fullWidth="xs">
        {
            jsonData.map(data => {
                return <TextArea title={data.usuario} subtitle={data.descripcion} enterprise={enterprise} btnText="Inscribirse" />
            })
        }
    </Container>
    )
}


export default Home;