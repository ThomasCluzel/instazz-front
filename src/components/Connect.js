import React, { useState } from 'react';
import API from '../API';
import { Redirect } from 'react-router-dom';
import { Snackbar, TextField, Button, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import theme from '../styles/theme';

/**
 * TODOs:
 * - After a successful login, redirect the user to his/her homepage
 * - Add a link to redirect to the registration page if the user does not have an account yet
 */

const useStyle = makeStyles(theme => ({
    form: {
        padding: "2%",
        height: "150%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-around",
        alignItems: "center"
    }
}));

const Connect = (props) => {
    const classes = useStyle();

    const [ pseudo, setPseudo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorAlert, setErrorAlert ] = useState(false);
    const [ errorMsg, setErrorMsg ] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post('user/signin', { "pseudo": pseudo, "password": password }).then(
            res => {
                console.log(pseudo + " is now connected.");
                // TODO: check because I'm not sure
                /*
                return (
                    <Redirect to='/' />
                );
                */
            },
            err => {
                console.log("Error from the API: " + err);
                setErrorMsg(err);
                setErrorAlert(true);
            }
        );
    };

    return (
        <div>
            <Snackbar open={errorAlert} autoHideDuration={5000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField name="pseudo" required label="Pseudo" variant={theme.props.variant}
                    defaultValue={pseudo} onChange={ (e) => setPseudo(e.target.value) } />
                <br />
                <TextField name="password" required label="Password" variant={theme.props.variant}
                    type="password" onChange={ (e) => setPassword(e.target.value) } />
                <br />
                <Button type="submit" variant={theme.props.variant} color="primary">
                    Log in
                </Button>
            </form>
        </div>
    );
};

export default Connect;
