import React from 'react';
import './App.css';

import Login from './pages/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useFirebase from './hooks/useFirebase';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"
                    render={() => <span></span>} />

                <Route path="/home"
                    render={() => <span></span>} />

                <Route path="/login"
                    render={Login} />
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