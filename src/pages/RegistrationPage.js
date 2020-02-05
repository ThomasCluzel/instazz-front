import React from 'react';
import { Typography } from "@material-ui/core";
import RegistrationForm from '../components/RegistrationForm';
import theme from '../styles/theme';

const RegistrationPage = () => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant} >Sign up</Typography>
        <RegistrationForm />
    </div>
);

export default RegistrationPage;
