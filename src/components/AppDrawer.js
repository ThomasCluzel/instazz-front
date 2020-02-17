import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { HomeOutlined, AccountCircleOutlined, FingerprintOutlined, BorderColorOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

// Style
const useStyle = makeStyles(theme => ({
    drawerButton: {
        color: theme.palette.textPrimary.main
    }
}));

/**
 * A drawer on the left of the page.
 * 
 * @param {*} props are { stateUser=[user, setUser], stateDrawerOpen=[ drawerOpen, setDrawerOpen ], toggleDrawer=toggleDrawer }
 */
const AppDrawer = (props) => {
    const classes = useStyle();

    // State
    const user = props.stateUser[0];
    const drawerOpen = props.stateDrawerOpen[0];
    const closeDrawer = props.closeDrawer;
    let history = useHistory();

    // Event handler
    const menuItemClicked = (link) => () => {
        history.push(link);
        closeDrawer();
    };

    return (
        <Drawer open={drawerOpen} onClose={closeDrawer}>
            <List>
                <ListItem button key="home" className={classes.drawerButton} onClick={menuItemClicked("/")}>
                    <ListItemIcon><HomeOutlined color="primary" /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                { user &&
                    <ListItem button key="profile" className={classes.drawerButton} onClick={menuItemClicked("/profile")}>
                        <ListItemIcon><AccountCircleOutlined color="primary" /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                }
                { !user &&
                    <ListItem button key="connect" className={classes.drawerButton} onClick={menuItemClicked("/connect")}>
                        <ListItemIcon><FingerprintOutlined color="primary" /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                }
                { !user &&
                    <ListItem button key="register" className={classes.drawerButton} onClick={menuItemClicked("/register")}>
                        <ListItemIcon><BorderColorOutlined color="primary" /></ListItemIcon>
                        <ListItemText primary="Register" />
                    </ListItem>
                }
            </List>
        </Drawer>
    );
};

export default AppDrawer;
