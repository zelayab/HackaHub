import { useContext, useState, useRef } from "react";

import { Container, Box, Avatar, Typography, Grid, TextField, Button, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { authContext } from "../context/appContext";

const Login = () => {
    const emailRef = useRef('');
    const passRef = useRef('');

    const [formStatus, setFormStatus] = useState({
        alert: {
            show: false,
            severity: '',
            message: '',
        },
        email: { error: false },
        password: { error: false, }
    });

    const { userLogin, userData, setUserData, userSendPasswordRecover } = useContext(authContext);

    const handleRecoverPassword = (e) => {
        e.preventDefault();

        const email = emailRef.current.value || '';

        if (email.length > 0) {
            userSendPasswordRecover(email)
                .then(data => {
                    let finalStatus = {};
                    if (data.error) {
                        const emailError = data.displayError.toUpperCase().includes('EMAIL') ? true : false;

                        finalStatus = {
                            ...formStatus,
                            alert: {
                                show: true,
                                severity: 'error',
                                message: data.displayError
                            },
                            email: { error: emailError },
                        };
                    }
                    else {
                        finalStatus = {
                            ...formStatus,
                            alert: {
                                show: true,
                                severity: 'success',
                                message: 'Te enviamos un email, revisa tu correo'
                            },
                            email: { error: false },
                        }
                    }

                    setFormStatus(finalStatus);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value || '';
        const password = passRef.current.value || '';

        if (email.length > 0 && password.length > 0) {
            userLogin(email, password)
                .then(data => {
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
                    else {
                        // Logueado correctamente
                    }
                });
        }
    }

    return (
        <Container maxWidth="xs">
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
                    Acceder
                </Typography>

                {/* Alert */}
                {
                    !formStatus.alert.show ? <></> :
                        <Alert severity={formStatus.alert.severity} sx={{ width: "92%", mt: 3 }}>
                            {formStatus.alert.message}
                        </Alert>
                }

                {/* Input Email & Input Password & Button Acceder */}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={formStatus.email.error}
                        margin="normal"
                        type="email"
                        fullWidth
                        label="Email"
                        inputRef={emailRef}
                    />
                    <TextField
                        error={formStatus.password.error}
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Password"
                        inputRef={passRef}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                        Acceder
                    </Button>
                </Box>

                {/* Recuperar Contraseña & Crear Cuenta */}
                <Grid container>
                    {/* Recuperar Cuenta */}
                    <Grid item
                        xs={12}
                        sm={8}
                        sx={{
                            mt: { xs: 1, sm: 0 },
                            mb: { xs: 2, sm: 0 },
                            textAlign: { xs: "center", sm: "left" }
                        }}
                    >
                        <Button type="button" size="small" onClick={handleRecoverPassword} variant="text">
                            Recuperar Contraseña
                        </Button>
                    </Grid>

                    {/* Crear Cuenta */}
                    <Grid item
                        xs={12}
                        sm={4}
                        sx={{ textAlign: { xs: "center", sm: "right" } }}
                    >
                        <Button size="small" href="/register" variant="text">
                            Crear Cuenta
                        </Button>
                    </Grid>

                    {/* "Copyright/Creditos" */}
                    <Grid item
                        xs={12}
                        sx={{ mt: 4 }}
                    >
                        <Typography variant="body2" color="text.secondary" align="center">
                            Gentleman Programming Hackathon - 2021
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Login;