import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home, AccountCircle, Fingerprint } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import RegistrationForm from './RegistrationForm';
import CreatePost from './CreatePost';
import Connect from './Connect';
import theme from '../styles/theme';

/**
 * TODOs:
 * - Handle connection (login button)
 *   - Hide useless item in the drawer when not connected
 * - Display correct pages in the Routes (maybe display only one component with different props)
 */

// NavBar style
const useStyle = makeStyles(theme => ({
    toolbar: {
        justifyContent: "space-between"
    },
    toolbarButton: {
        color: "white"
    },
    drawerButton: {
        color: theme.palette.primary.main
    }
}));

const AppNavBar = () => {
    const classes = useStyle();

    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ connected, setConnected ] = useState(false);

    const toggleDrawer = (newState) => () => setDrawerOpen(newState);

    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >
                    <IconButton edge="start" onClick={ toggleDrawer(true) } >
                        <MenuIcon className={classes.toolbarButton} />
                    </IconButton>
                    <h1>InstaZZ</h1>
                    <Link to="/connect">
                        <Button variant={theme.props.variant} className={classes.toolbarButton} >
                            { (connected) ? "Log out" : "Login" }
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={ toggleDrawer(false) }>
                <List>
                    <Link to="/" onClick={toggleDrawer(false)}>
                        <ListItem button key="home" className={classes.drawerButton}>
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    <Link to="/profile" onClick={toggleDrawer(false)}>
                        <ListItem button key="profile" className={classes.drawerButton}>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                    <Link to="/connect" onClick={toggleDrawer(false)}>
                        <ListItem button key="connect" className={classes.drawerButton}>
                            <ListItemIcon><Fingerprint /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>

            <Switch>
                <Route path="/profile"><CreatePost /></Route>
                <Route path="/connect"><RegistrationForm /></Route>
                <Route path="/"><Connect /></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default AppNavBar;
