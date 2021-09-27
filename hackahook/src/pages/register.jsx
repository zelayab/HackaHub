import { useContext, useState, useRef } from 'react';

import { Container, Box, Avatar, Typography, TextField, Button, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { authContext } from '../context/appContext';

const Register = () => {
    const emailRef = useRef('');
    const userRef = useRef('');
    const linkedinRef = useRef('');
    const paisRef = useRef('');
    const repositorioRef = useRef('');
    const passwordRef = useRef('');
    const repPasswordRef = useRef('');
    const descripcionRef = useRef('');

    const [formStatus, setFormStatus] = useState({
        alert: {
            show: false,
            severity: '',
            message: '',
        },
        email: { error: false },
        user: { error: false },
        linkedin: { error: false },
        pais: { error: false },
        repositorio: { error: false },
        password: { error: false, },
        repPassword: { error: false },
        descripcion: { error: false },
    });

    const { userRegister } = useContext(authContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const user = userRef.current.value;
        const linkedin = linkedinRef.current.value;
        const pais = paisRef.current.value;
        const repositorio = repositorioRef.current.value;
        const password = passwordRef.current.value;
        const repPassword = repPasswordRef.current.value;
        const descripcion = descripcionRef.current.value;

        userRegister(email, user, linkedin, pais, repositorio, password, repPassword, descripcion)
            .then(data => {
                console.log(data);
                if (data.error) {
                    const emailError = data.displayError.toUpperCase().includes('EMAIL') ? true : false;
                    const passwordError = data.displayError.toUpperCase().includes('CONTRASEÑA') ? true : false;

                    setFormStatus({
                        ...formStatus,
                        alert: {
                            show: true,
                            severity: 'error',
                            message: data.displayError
                        },
                        email: { error: emailError },
                        password: { error: passwordError }
                    });
                }
            });
    }

    return (
        <Container fullWidth="xs">
            <Box fullWidth sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>

                {/* Alert */}
                {
                    !formStatus.alert.show ? <></> :
                        <Alert severity={formStatus.alert.severity} sx={{ width: "92%", mt: 3 }}>
                            {formStatus.alert.message}
                        </Alert>
                }

                {/* Registro */}
                <Box component="form" noValidate onSubmit={handleSubmit} >
                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Email"
                        inputRef={emailRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Usuario"
                        inputRef={userRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Linkedin"
                        inputRef={linkedinRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="País"
                        inputRef={paisRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Repositorio"
                        inputRef={repositorioRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Contraseña"
                        inputRef={passwordRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Repita la Contraseña"
                        inputRef={repPasswordRef}
                    />

                    <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Ingrese una breve descripción"
                        inputRef={descripcionRef}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Registrarse
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Register;