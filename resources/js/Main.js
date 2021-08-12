import React from 'react';

import List from './components/List';
import Header from './components/Header';
import CreateElement from './components/CreateElement';
import ViewElement from "./components/ViewElement";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
} from "react-router-dom"

function Main() {
    return (
        <Router>
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path="/">
                        <List />
                    </Route>
                    <Route exact path="/new-element">
                        <CreateElement />
                    </Route>
                    <Route exact path="/message/:id">
                        <ViewElement />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Main;
