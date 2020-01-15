// Component to register a new user

import React, { useState } from 'react';
import API from '../API';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

const RegistrationForm = () => {
    // state
    const [name, setName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertShown, setAlertShown] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    const submitForm = (e) => {
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setErrorMsg("Error: password and confirmed password are different");
            setAlertShown(true);
            return;
        }
        API.post('users', { name: name, pseudo: pseudo, password: password })
        .then(
            ok => { console.log('ok'); }, // TODO: go to the home page
            err => {
                setErrorMsg(err);
                setAlertShown(true);
            }
        )
    }

    const handleAlertClose = () => setAlertShown(false);

    return (
        <ThemeProvider theme={theme} >
            <form onSubmit={submitForm}>
                <TextField id="name" variant={theme.props.variant} label="Name" required onChange={(e)=>{setName(e.target.value);}} />  <br />
                <TextField id="pseudo" variant={theme.props.variant} label="Pseudo" required onChange={(e)=>{setPseudo(e.target.value);}} />  <br />
                <TextField id="password" variant={theme.props.variant} label="Password" type="password" required onChange={(e)=>{setPassword(e.target.value);}} />  <br />
                <TextField id="confirmPassword" variant={theme.props.variant} label="Confirm password" type="password" required onChange={(e)=>{setConfirmPassword(e.target.value);}} />  <br />
                <Button variant={theme.props.variant} color="primary" type="submit">Register</Button>
            </form>
            <Snackbar open={alertShown} autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default RegistrationForm;
