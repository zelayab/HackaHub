import { useContext, useState, useRef } from 'react';

import { Container, Box, Avatar, Typography, TextField, Button, Grid, Alert, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { authContext } from '../context/appContext';

const typeOptions = [
    {
        value: false,
        label: 'Usuario'
    },
    {
        value: true,
        label: 'Empresa'
    }
]

const Register = () => {
    const [accountType, setAccountType] = useState(false);

    const emailRef = useRef('');
    const usuarioRef = useRef('');
    const linkedinRef = useRef('');
    const paisRef = useRef('');
    const repositorioRef = useRef('');
    const urlEmpresaRef = useRef('');
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
        usuario: { error: false },
        type: { error: false },
        linkedin: { error: false },
        pais: { error: false },
        repositorio: { error: false },
        urlEmpresa: { error: false },
        password: { error: false, },
        repPassword: { error: false },
        descripcion: { error: false },
    });

    const { userRegister } = useContext(authContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const usuario = usuarioRef.current.value;
        const type = accountType;
        const linkedin = linkedinRef.current.value;
        const pais = paisRef.current.value;
        const repositorio = repositorioRef.current.value;
        const urlEmpresa = urlEmpresaRef.current.value;
        const password = passwordRef.current.value;
        const repPassword = repPasswordRef.current.value;
        const descripcion = descripcionRef.current.value;

        let parametros = {
            email,
            usuario,
            type,
            linkedin,
            pais,
            password,
            repPassword,
            descripcion
        }

        parametros[(accountType ? "urlEmpresa" : "repositorio")] = accountType ? urlEmpresa : repositorio;

        userRegister(parametros)
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

    const handleChange = (event) => {
        setAccountType(event.target.value);
    };

    return (
        <Container maxWidth="sm">
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
                <Box component="form" noValidate onSubmit={handleSubmit}
                    sx={{
                        mt: 4
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Tipo de Cuenta"
                                fullWidth
                                value={accountType ? true : false}
                                onChange={handleChange}
                            >
                                {
                                    typeOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Email"
                                inputRef={emailRef}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Usuario"
                                inputRef={usuarioRef}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Linkedin"
                                inputRef={linkedinRef}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="text"
                                fullWidth
                                label="País"
                                inputRef={paisRef}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {
                                accountType ?
                                    <TextField
                                        margin="normal"
                                        type="text"
                                        fullWidth
                                        label="Link de empresa"
                                        inputRef={urlEmpresaRef}
                                    />
                                    :
                                    <TextField
                                        margin="normal"
                                        type="text"
                                        fullWidth
                                        label="Repositorio"
                                        inputRef={repositorioRef}
                                    />
                            }

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Contraseña"
                                inputRef={passwordRef}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Repita la Contraseña"
                                inputRef={repPasswordRef}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Descripcion"
                                multiline
                                fullWidth
                                rows={3}
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
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register;