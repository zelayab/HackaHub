import { useState } from 'react';

import { Button } from '@mui/material';

import AlertDialog from '../Dialog/Dialog';

const CreateBootcamp = (props) => {
    const { userInformation, postBootcamp } = props;

    const [descripcion, setDescripcion] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setDescripcion(e.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReject = () => {
        setOpen(false);
    }

    const handleAccept = () => {
        setOpen(false);

        postBootcamp(userInformation.uid, descripcion);
    }

    const handlePostBootcamp = () => {
        setOpen(true);
    }

    return (
        <>
            <AlertDialog
                open={open}
                handleReject={handleReject}
                handleAccept={handleAccept}
                handleClose={handleClose}
                title="Crear un aviso de bootcamp"
                text="Inserta una descripcion para la publicacion de tu bootcamp"

                insertTextField="true"
                handleChange={handleChange}
            />
            <Button onClick={handlePostBootcamp} variant="contained" color="info" sx={{ mr: 3 }}>
                Crear Bootcamp
            </Button>
        </>
    );
}

export default CreateBootcamp;