import React from 'react';
import Connect from "../components/Connect"
import Box from "@material-ui/core/Box"

function ConnectionPage() {
    return (
        <div>
            <h2>Connection: </h2>
            <Box borderColor="black" borderRadius={10}>
                <Connect/>
            </Box>
        </div>
    );
}

export default ConnectionPage;