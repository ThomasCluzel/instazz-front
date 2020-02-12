import React from 'react';
import { CircularProgress } from '@material-ui/core';


const InfiniteProgressBar = ({isVisible}) => (
    <div style={{justifyContent: "center", visibility: isVisible ? "" : "hidden"}}>
        <CircularProgress color="secondary" />
    </div>
);

export default InfiniteProgressBar;
