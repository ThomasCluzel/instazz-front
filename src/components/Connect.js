import React, { useState } from 'react';
import API from '../API';
import { Snackbar, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import theme from '../styles/theme';
import useAppStyle from '../styles/styles';
import InfiniteProgressBar from './InfiniteProgressBar';
import { useHistory } from 'react-router-dom';

/**
 * The form to fill out for the user to log in.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const Connect = (props) => {
    const classes = useAppStyle();
    let history = useHistory();

    // State of the component
    const [ pseudo, setPseudo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorAlert, setErrorAlert ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ showProgressBar, setShowProgressBar ] = useState(false);
    const [ user, setUser ] = props.stateUser;
    
    // If the user is already connected we redirect him/her to the homepage
    if(user)
        history.push("/");

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowProgressBar(true);
        // ask the API to log the user in
        API.post('users/signin', { "pseudo": pseudo, "password": password })
        .then(
            res => { // login success
                setUser({ // set the new user
                    name: res.data.name,
                    pseudo: res.data.pseudo,
                    role: res.data.role,
                    _id: res.data._id
                });
                window.localStorage.setItem("token", res.data.token); // store the JWT
                history.push('/'); // redirect to home page
            },
            err => { // login failure
                console.log("Error from the API: " + err);
                setErrorMsg("" + err); // show the problem
                setErrorAlert(true);
                setShowProgressBar(false);
            }
        );
    };

    return (
        <div>
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

            <InfiniteProgressBar isVisible={showProgressBar} />

            <Snackbar open={errorAlert} autoHideDuration={5000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Connect;
