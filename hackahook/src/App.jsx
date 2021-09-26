import React, { useContext } from 'react';
import './App.css';

import { Spinner } from './components/Spinner/Spinner';

import Login from './pages/Login';
import Register from './pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { authContext } from './context/appContext';
import { List, ListItem, Divider, ListItemText } from '@mui/material';

const ComponenteHome = () => {

    return (
        <div>
            <List component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>
            hola
        </div>
    )
}

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
                    render={() => <ComponenteHome />} />

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