import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import GameEngines from "../components/Projects/GameEngines";

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/GameEngines' component={GameEngines}></Route>
        </Switch>
    );
}

export default Main;