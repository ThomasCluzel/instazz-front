import React from 'react';
import { Typography } from "@material-ui/core";
import RegistrationForm from '../components/RegistrationForm';
import theme from '../styles/theme';

/**
 * RegistrationPage is a component to display the RegistrationForm
 * to ask the potentially new user for information and create
 * an account
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const RegistrationPage = (props) => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant} >Sign up</Typography>
        <RegistrationForm stateUser={props.stateUser} />
    </div>
);

export default RegistrationPage;
