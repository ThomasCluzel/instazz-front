import React, { useState } from 'react';
import API from '../API';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import theme from '../styles/theme';
import useAppStyle from '../styles/styles';
import InfiniteProgressBar from './InfiniteProgressBar';
import { useHistory, Redirect } from 'react-router-dom';

/**
 * Component to register a new user
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const RegistrationForm = (props) => {
    const classes = useAppStyle();
    let history = useHistory();

    // state
    const [ name, setName ] = useState('');
    const [ pseudo, setPseudo ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ alertShown, setAlertShown ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ showProgressBar, setShowProgressBar ] = useState(false);
    const [ user, setUser ] = props.stateUser;

    // If the user is already connected we redirect him/her to the homepage
    if(user)
        return (<Redirect to="/" />);

    const submitForm = (e) => {
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setErrorMsg("Error: password and confirmed password are different");
            setAlertShown(true);
            return;
        }
        setShowProgressBar(true);
        API.post('users', { name: name, pseudo: pseudo, password: password })
        .then(
            res => {
                const newUser = { // turn the response to a user object
                    name: res.data.name,
                    pseudo: res.data.pseudo,
                    role: res.data.role,
                    _id: res.data._id,
                    token: res.data.token
                }
                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser)); // store the user
                history.push('/');
            },
            err => {
                setErrorMsg(err+"");
                setAlertShown(true);
                setShowProgressBar(false);
            }
        )
    }

    const handleAlertClose = () => setAlertShown(false);

    return (
        <div>
            <form onSubmit={submitForm} className={classes.form} >
                <TextField id="name" variant={theme.props.variant} label="Name"
                    required onChange={ (e) => { setName(e.target.value); } } />  <br />
                <TextField id="pseudo" variant={theme.props.variant} label="Pseudo"
                    required onChange={ (e) => { setPseudo(e.target.value); } } />  <br />
                <TextField id="password" variant={theme.props.variant} label="Password" type="password"
                    required onChange={ (e) => { setPassword(e.target.value); } } />  <br />
                <TextField id="confirmPassword" variant={theme.props.variant} label="Confirm password" type="password"
                    required onChange={ (e) => { setConfirmPassword(e.target.value); } } />  <br />
                <Button variant={theme.props.variant} color="primary" type="submit">Register</Button>
            </form>

            <InfiniteProgressBar isVisible={showProgressBar} />
            
            <Snackbar open={alertShown} autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
        </div>
    );
};

export default RegistrationForm;
