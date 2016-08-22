import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import ES6Promise from 'es6-promise';
import { createHashHistory } from 'history'
import MainComponent from 'components/MainComponent/MainComponent.js';
import Routes from './routes.js';

ES6Promise.polyfill();

const routes = (
    <Router history={browserHistory}>
        <Route path={Routes.main} component={MainComponent} />
    </Router>
);

const appNode = document.getElementById('client-content');
ReactDOM.render(routes, appNode);