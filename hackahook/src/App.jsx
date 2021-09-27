import React, { useContext } from 'react';
import './App.css';

import { Spinner } from './components/Spinner/Spinner';

import Login from './pages/login';
import Register from './pages/register';
import Enterprise from './pages/Enterprise';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { authContext } from './context/appContext';

import Navbar from './components/Navbar/Navbar';

const ComponenteHome = () => {
    // const { getDb, getCurrentAuth, getUserInformation, getBootcamp, userInformation } = useContext(authContext);

    return (

        <div>
            <Button>a
                {/* {userInformation.email} */}
            </Button>
        </div>
    )
}

const App = () => {
    const { userData } = useContext(authContext);
    const isMobile = useMediaQuery('(max-width: 600px)')

    const checkIfRequireAuth = (requireSession, Component) => {
        if (userData.loading)
            return <Spinner />

        if (requireSession && !userData.logged)
            return <Redirect to="/login" />

        if (!requireSession && userData.logged)
            return <Redirect to="/" />

        return <Component />
    }

    return (
        <Router>
            <Navbar isMobile={isMobile} />
            <Switch>
                <Route exact path="/"
                    render={() => checkIfRequireAuth(true, ComponenteHome)} />

                <Route path="/home"
                    render={() => checkIfRequireAuth(true, ComponenteHome)} />

                <Route path="/login"
                    render={() => checkIfRequireAuth(false, Login)} />
                <Route path="/register"
                    render={() => checkIfRequireAuth(false, Register)} />
                {/* <Route exact path="/"
                    render={() => protectedPath(ComponenteHome)} />

                <Route path="/home"
                    render={() => protectedPath(ComponenteHome)} />

                <Route path="/login"
                    render={() => requireAuth(Login)} />
                <Route path="/register"
                    render={() => requireAuth(Register)} /> */}

                <Route path="/mybootcamp"
                    render={() => <Enterprise />} />
                <Route path="/subscriptions"
                    render={() => <span>suscriptions</span>} />

                <Route path="*">
                    <span>404 - Not Found</span>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;