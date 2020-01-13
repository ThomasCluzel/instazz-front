// Component to register a new user

import React, { useState } from 'react';
import API from '../API';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

const RegistrationForm = () => {
    // state
    const [name, setName] = useState(0);
    const [pseudo, setPseudo] = useState(1);
    const [password, setPassword] = useState(2);
    const [confirmPassword, setConfirmPassword] = useState(3);

    return (
        <ThemeProvider theme={theme} >
            <form onSubmit={ (e) => {
                e.preventDefault();
                API.post('users', { name: name, pseudo: pseudo })
                .then(
                    ok => {}, // TODO: display a message with the Snackbar of Material UI
                    err => {} // TODO: display an error
                )
            }}>
                <TextField id="name" variant={theme.props.variant} label="Name" required onChange={(e)=>{setName(e.target.value);}} />  <br />
                <TextField id="pseudo" variant={theme.props.variant} label="Pseudo" requiredonChange={(e)=>{setPseudo(e.target.value);}} />  <br />
                <TextField id="password" variant={theme.props.variant} label="Password" type="password" required onChange={(e)=>{setPassword(e.target.value);}} />  <br />
                <TextField id="confirmPassword" variant={theme.props.variant} label="Confirm password" type="password" required onChange={(e)=>{setConfirmPassword(e.target.value);}} />  <br />
                <Button variant={theme.props.variant} color="primary" type="submit">Register</Button>
            </form>
        </ThemeProvider>
    );
};

export default RegistrationForm;
