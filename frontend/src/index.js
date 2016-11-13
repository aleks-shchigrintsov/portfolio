import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import ES6Promise from 'es6-promise';
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

import MainComponent from 'components/MainComponent';
import AboutMeContainer from 'containers/AboutMeContainer';

import Routes from 'routes.js';

ES6Promise.polyfill();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path={Routes.main} component={MainComponent}>
                <Route path={Routes.aboutMe} component={AboutMeContainer}/>
            </Route>
        </Router>
    </Provider>
);

const appNode = document.getElementById('client-content');
ReactDOM.render(routes, appNode);