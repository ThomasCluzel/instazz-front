import React from 'react';
import { AppBar, Toolbar, IconButton, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../styles/theme';
import { useHistory } from 'react-router-dom';

// NavBar style
const useStyle = makeStyles(theme => ({
    toolbar: {
        justifyContent: "space-between"
    },
    toolbarButton: {
        color: "white"
    }
}));

/**
 * A component to display the nav banner at the top of the page.
 * 
 * @param {*} stateUser is  [ user, setUser ]
 * @param {*} openDrawer is a function to toggle the drawer on the left of the page
 */
const AppNav = ({stateUser, openDrawer}) => {
    const classes = useStyle();
    let history = useHistory();

    // State
    const [ user, setUser ] = stateUser;

    // Event handler
    const logInOutButton = () => {
        // if the user is connected, we must disconnect him/her
        if(user) {
            localStorage.removeItem("token"); // clear JWT
            setUser(null); // clear app state
            history.push("/"); // and redirect the user to the home page
        }
        else { // otherwise, we redirect him/her to the connection page
            history.push("/connect");
        }
    };

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar} >
                <IconButton edge="start" onClick={openDrawer} >
                    <MenuIcon className={classes.toolbarButton} />
                </IconButton>
                <h1>InstaZZ</h1>
                <Button variant={theme.props.variant}
                        className={classes.toolbarButton}
                        onClick={logInOutButton} >
                    { (user) ? "Log out" : "Login" }
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNav;
