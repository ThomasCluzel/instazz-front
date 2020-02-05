import React from 'react';
import { Typography } from "@material-ui/core";
import Connect from "../components/Connect";
import theme from '../styles/theme';

/**
 * ConnectionPage is a component to display the connect component and
 * ask the user for his/her credentials.
 * 
 * @param {*} props is { connectedState: [connected, setConnected] }
 */
const ConnectionPage = (props) => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant}>Connection</Typography>
        <Connect connectedState={props.connectedState} />
        <Typography color="textPrimary">
            Not part of InstaZZ yet? <a href="/register">Create an account</a>, it's free.
        </Typography>
    </div>
);

export default ConnectionPage;