//Dependencias
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Components
import App from './components/App';
import P404 from './components/404-Page'
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Home from './components/Home'


const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/Create" component={Create} />
            <Route exact path="/Edit" component={Edit} />
            <Route exact path="/Delete" component={Delete} />
            <Route exact path="/" component={Home} />
            <Route component={P404} />
        </Switch>
    </App>

export default AppRoutes;