import './App.css';

import Login from './pages/Login';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Componente1 = () => (
    <span>Ruta 1</span>
)

const Componente2 = () => (
    <span>Ruta 2</span>
)

const protectedPath = (Component) => {
    // if(loading)
    // return <Spinner />

    // if(!logged)
    // return <Redirect to="/signin"/>

    return <Component/>
}

function App() {
    return(
        <Router> 
            <Switch>
                <Route exact path="/"
                    render={Componente1}/>

                <Route path="/home"
                    render={Componente2}/>

                <Route path="/login"
                    render={Login}/>
                <Route path="/register"
                    render={Componente2}/>

                <Route path="/mybootcamp"
                    render={Componente2}/>
                <Route path="/subscriptions"
                    render={Componente2}/>

                <Route path="*">
                    <span>404 - Not Found</span>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
