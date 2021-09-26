import React, { useContext } from 'react';
import './App.css';

import Login from './pages/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authContext } from './context/appContext';

const authSection = () => {
}

const checkIsUserAuth = () => {
}

const App = () => {
    const { userData } = useContext(authContext);

    return (
        <Router>
            <Switch>
                <Route exact path="/"
                    render={() => <span></span>} />

                <Route path="/home"
                    render={() => <span></span>} />

                <Route path="/login"
                    render={() => <Login />} />
                <Route path="/register"
                    render={() => <span></span>} />

                <Route path="/mybootcamp"
                    render={() => <span></span>} />
                <Route path="/subscriptions"
                    render={() => <span></span>} />

                <Route path="*">
                    <span>404 - Not Found</span>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;