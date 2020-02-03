import React, { useState } from 'react';
import API from '../API';
import { Snackbar, TextField, Button, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import theme from '../styles/theme';

// Style of the form to login
const useStyle = makeStyles(() => ({
    form: {
        padding: "2%",
        height: "150%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-around",
        alignItems: "center"
    }
}));

/**
 * The form to fill out for the user to log in.
 * 
 * @param {*} props is { connectedState: [connected, setConnected] }
 */
const Connect = (props) => {
    const classes = useStyle();

    // State of the component
    const [ pseudo, setPseudo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorAlert, setErrorAlert ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ connected, setConnected ] = props.connectedState;
    
    // If the user is already connected we redirect him/her to the homepage
    if(connected)
        window.location = "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        // ask the API to log the user in
        API.post('user/signin', { "pseudo": pseudo, "password": password }).then(
            res => { // login success
                console.log(pseudo + " is now connected.");
                localStorage.setItem("token", res.data.token); // store the JWT
                setConnected(true); // change app state
                window.location = "/"; // redirect to home page
            },
            err => { // login failure
                console.log("Error from the API: " + err);
                setErrorMsg("" + err); // show the problem
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
