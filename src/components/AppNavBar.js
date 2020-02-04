import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HomeOutlined, AccountCircleOutlined, FingerprintOutlined, BorderColorOutlined } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import RegistrationForm from './RegistrationForm';
import CreatePost from './CreatePost';
import theme from '../styles/theme';
import ConnectionPage from '../pages/ConnectionPage';
import PostList from './PostList';

/**
 * TODOs:
 * - Display correct pages in the Routes
 *   - Connection : OK
 *   - Registration
 *   - Profile
 *   - Home page
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
        color: theme.palette.textPrimary.main
    }
}));

const AppNavBar = () => {
    const classes = useStyle();

    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const [ connected, setConnected ] = useState(localStorage.getItem("token") !== null);

    // Event handlers
    const toggleDrawer = (newState) => () => setDrawerOpen(newState);
    const logInOutButton = () => {
        // if the user is connected, we must disconnect him/her
        if(connected) {
            localStorage.removeItem("token"); // clear JWT
            setConnected(false); // clear app state
        }
        else { // otherwise, we redirect him/her to the connection page
            window.location = "/connect";
        }
    };

    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >
                    <IconButton edge="start" onClick={ toggleDrawer(true) } >
                        <MenuIcon className={classes.toolbarButton} />
                    </IconButton>
                    <h1>InstaZZ</h1>
                    <Button variant={theme.props.variant}
                            className={classes.toolbarButton}
                            onClick={logInOutButton} >
                        { (connected) ? "Log out" : "Login" }
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={ toggleDrawer(false) }>
                <List>
                    <Link to="/" onClick={toggleDrawer(false)}>
                        <ListItem button key="home" className={classes.drawerButton}>
                            <ListItemIcon><HomeOutlined color="primary" /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    { connected &&
                        <Link to="/profile" onClick={toggleDrawer(false)}>
                            <ListItem button key="profile" className={classes.drawerButton}>
                                <ListItemIcon><AccountCircleOutlined color="primary" /></ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                        </Link>
                    }
                    { !connected &&
                        <Link to="/connect" onClick={toggleDrawer(false)}>
                            <ListItem button key="connect" className={classes.drawerButton}>
                                <ListItemIcon><FingerprintOutlined color="primary" /></ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        </Link>
                    }
                    { !connected &&
                        <Link to="/register" onClick={toggleDrawer(false)}>
                            <ListItem button key="register" className={classes.drawerButton}>
                                <ListItemIcon><BorderColorOutlined color="primary" /></ListItemIcon>
                                <ListItemText primary="Register" />
                            </ListItem>
                        </Link>
                    }
                </List>
            </Drawer>

            <Switch>
                <Route path="/connect"><ConnectionPage connectedState={[connected, setConnected]} /></Route>
                <Route path="/register"><RegistrationForm /></Route>
                <Route path="/profile"><CreatePost /></Route>
                <Route path="/"><PostList /></Route>

            </Switch>
        </BrowserRouter>
    );
};

export default AppNavBar;
