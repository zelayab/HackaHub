import React, { useContext } from 'react';
import './App.css';

import { Spinner } from './components/Spinner/Spinner';

import Login from './pages/Login';
import Register from './pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { authContext } from './context/appContext';


const App = () => {
    const { userData } = useContext(authContext);

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
            <Switch>
                <Route exact path="/"
                    render={() => <Redirect to="/home" />} />

                <Route path="/home"
                    render={() => <span>home</span>} />

                <Route path="/login"
                    render={() => checkIfRequireAuth(false, Login)} />
                <Route path="/register"
                    render={() => checkIfRequireAuth(false, Register)} />

                <Route path="/mybootcamp"
                    render={() => <span>mybootcamp</span>} />
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