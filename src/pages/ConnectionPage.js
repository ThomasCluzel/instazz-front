import React from 'react';
import { Typography } from "@material-ui/core";
import Connect from "../components/Connect";

const ConnectionPage = () => (
    <div style={ {textAlign: "center"} }>
        <Typography variant="h4">Connection</Typography>
        <Connect/>
    </div>
);

export default ConnectionPage;