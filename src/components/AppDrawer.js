import React from 'react';
import { Drawer, List, Link, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { HomeOutlined, AccountCircleOutlined, FingerprintOutlined, BorderColorOutlined } from '@material-ui/icons';

// Style
const useStyle = makeStyles(theme => ({
    drawerButton: {
        color: theme.palette.textPrimary.main
    }
}));

/**
 * A drawer on the left of the page.
 * 
 * @param {*} props are stateUser={[user, setUser]} stateDrawerOpen={[ drawerOpen, setDrawerOpen ]} toggleDrawer={toggleDrawer}
 */
const AppDrawer = (props) => {
    const classes = useStyle();

    // State
    const user = props.stateUser[0];
    const drawerOpen = props.stateDrawerOpen[0];
    const toggleDrawer = props.toggleDrawer;

    return (
        <Drawer open={drawerOpen} onClose={ toggleDrawer(false) }>
            <List>
                <Link to="/" onClick={toggleDrawer(false)}>
                    <ListItem button key="home" className={classes.drawerButton}>
                        <ListItemIcon><HomeOutlined color="primary" /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                { user &&
                    <Link to="/profile" onClick={toggleDrawer(false)}>
                        <ListItem button key="profile" className={classes.drawerButton}>
                            <ListItemIcon><AccountCircleOutlined color="primary" /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                }
                { !user &&
                    <Link to="/connect" onClick={toggleDrawer(false)}>
                        <ListItem button key="connect" className={classes.drawerButton}>
                            <ListItemIcon><FingerprintOutlined color="primary" /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </Link>
                }
                { !user &&
                    <Link to="/register" onClick={toggleDrawer(false)}>
                        <ListItem button key="register" className={classes.drawerButton}>
                            <ListItemIcon><BorderColorOutlined color="primary" /></ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItem>
                    </Link>
                }
            </List>
        </Drawer>
    );
};

export default AppDrawer;
