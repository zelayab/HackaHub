import React, { useContext } from 'react';
import './App.css';

import { Spinner } from './components/Spinner/Spinner';

import Login from './pages/login';
import Register from './pages/register';
import Enterprise from './pages/Enterprise';

import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { authContext } from './context/appContext';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

// Middleware para chequear los accesos loading etc
const CheckIfRequireAuth = (props) => {
    const { userData, userInformation } = useContext(authContext);
    const { requireSession, Component } = props;

    const location = useLocation().pathname;

    // Si no termino de cargar lo básico como el logueo...
    if (userData.loading)
        return <Spinner />

    // Si quiere entrar en algun lado que necesita estar logueado
    // Lo mandamos directo al login
    if (requireSession && !userData.logged)
        return <Login />

    // Si quiere entrar al login, por alguna razón pero esta logueado
    // Lo mandamos al Home
    if (!requireSession && userData.logged)
        return <Home />

    // Si es de tipo empresa y trata de entrar al url de mybootcamp
    // Lo mandamos a el url de subscripciones
    if (location === '/mybootcamp' && !userInformation.type)
        return <Enterprise pathname="/subscriptions" />

    // Si es de tipo empresa y trata de entrar al url de subscripciones
    // Lo mandamos a el url de mybootcamp
    if (location === '/subscriptions' && userInformation.type)
        return <Enterprise pathname="/mybootcamp" />

    // Caso contrario mandamos el componente de la ruta normalmente
    return <Component pathname={location} />
}

const App = () => {
    const isMobile = useMediaQuery('(max-width: 600px)')

    return (
        <Router>
            <Navbar isMobile={isMobile} />
            <Switch>
                <Route exact path="/"
                    render={() => <CheckIfRequireAuth requireSession={true} Component={Home} />} />

                <Route path="/home"
                    render={() => <CheckIfRequireAuth requireSession={true} Component={Home} />} />

                <Route path="/login"
                    render={() => <CheckIfRequireAuth requireSession={false} Component={Login} />} />
                <Route path="/register"
                    render={() => <CheckIfRequireAuth requireSession={false} Component={Register} />} />

                <Route path="/mybootcamp"
                    render={() => <CheckIfRequireAuth requireSession={true} Component={Enterprise} />} />

                <Route path="/subscriptions"
                    render={() => <CheckIfRequireAuth requireSession={true} Component={Enterprise} />} />

                <Route path="*">
                    <span>404 - Not Found</span>
                </Route>
            </Switch >
        </Router >
    );
}

export default App;