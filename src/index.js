import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CombinedReducers from './combined-reducers';
import People from '../src/container/people/index';
import Person from '../src/container/person/index';

function App() {
    const middlewares = [
        thunk
    ];
    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const store = createStore(
        CombinedReducers,
        composeEnhancers(...enhancers)
    );
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route component={() => <People />} path="/people"/>
                    <Route component={ props => <Person {...props} />} path="/person/:id"/>
                </Switch>
            </Router>
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
