import React from 'react';
import { Typography } from "@material-ui/core";
import Connect from "../components/Connect";
import theme from '../styles/theme';
import useAppStyle from '../styles/styles';

/**
 * ConnectionPage is a component to display the connect component and
 * ask the user for his/her credentials.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const ConnectionPage = (props) => {
    // style
    const classes = useAppStyle();

    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant}>Connection</Typography>
            <Connect stateUser={props.stateUser} />
            <Typography color="textPrimary">
                Not part of InstaZZ yet? <a href="/register">Create an account</a>, it's free.
            </Typography>
        </div>
    )
};

export default ConnectionPage;