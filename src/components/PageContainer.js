import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ConnectionPage from '../pages/ConnectionPage';
import RegistrationPage from '../pages/RegistrationPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import AppNav from './AppNav';
import AppDrawer from './AppDrawer';

/**
 * PageContainer component contains the nav, the drawer and the router to
 * the pages of the app.
 */
const PageContainer = () => {
    // State
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ user, setUser ] = useState(null);

    // Event handlers
    const toggleDrawer = (newState) => () => setDrawerOpen(newState);

    return (
        <BrowserRouter>
            <AppNav stateUser={[user, setUser]} toggleDrawer={toggleDrawer} />

            <AppDrawer stateUser={[user, setUser]} stateDrawerOpen={[ drawerOpen, setDrawerOpen ]} toggleDrawer={toggleDrawer} />

            <Switch>
                <Route path="/connect"><ConnectionPage stateUser={[user, setUser]} /></Route>
                <Route path="/register"><RegistrationPage stateUser={[user, setUser]} /></Route>
                <Route path="/profile"><ProfilePage stateUser={[user, setUser]} /></Route>
                <Route path="/"><HomePage /></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default PageContainer;
