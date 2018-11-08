//Dependencia
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'


//Routes 
import Approutes from './routes'

//Assets
import './index.css';

render(
    <Router>
        <Approutes />
    </Router>,
    document.getElementById('root')
);