import React from 'react';

import List from './components/List';

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
                <Switch>
                    <Route exact path="/">
                        <List />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Main;
