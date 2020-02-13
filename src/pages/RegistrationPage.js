import React from 'react';
import { Typography } from "@material-ui/core";
import RegistrationForm from '../components/RegistrationForm';
import theme from '../styles/theme';
import useAppStyle from '../styles/styles';

/**
 * RegistrationPage is a component to display the RegistrationForm
 * to ask the potentially new user for information and create
 * an account
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const RegistrationPage = (props) => {
    // style
    const classes = useAppStyle();
    
    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant} >Sign up</Typography>
            <RegistrationForm stateUser={props.stateUser} />
        </div>
    )
};

export default RegistrationPage;
