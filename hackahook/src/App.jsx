import React, { useContext } from 'react';
import './App.css';

import { Spinner } from './components/Spinner/Spinner';

import Login from './pages/login';
import Register from './pages/register';
import Emprise from './pages/emprise';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { authContext } from './context/appContext';

import Navbar from './components/Navbar/Navbar';
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
            <Navbar isMobile={isMobile}/>
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
                    render={() => <Emprise/>} />
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