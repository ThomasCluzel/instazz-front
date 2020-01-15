import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, AccountCircle, Fingerprint } from '@material-ui/icons';
import Connect from './Connect';
import RegistrationForm from './RegistrationForm';
import CreatePost from './CreatePost';

const AppRouter = () => {
    const [value, setValue] = useState(0);

    const handleActionChanged = (event, newValue)=> setValue(newValue);

    // TODO: use the correct components in Links and debug
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/profile"><RegistrationForm /></Route>
                <Route path="/connect"><CreatePost /></Route>
                <Route path="/"><Connect /></Route>
            </Switch>
            <BottomNavigation
                value={value}
                onChange={handleActionChanged}
                showLabels>
                <Link to="/">
                    <BottomNavigationAction label="Home" icon={<Home />} />
                </Link>
                <Link to="/profile">
                    <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
                </Link>
                <Link to="/connect">
                    <BottomNavigationAction label="Connection" icon={<Fingerprint />} />
                </Link>
            </BottomNavigation>
        </BrowserRouter>
    );
};

export default AppRouter;
