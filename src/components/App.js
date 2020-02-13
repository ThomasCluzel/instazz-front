import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import AppNavBar from './AppNavBar';
import theme from '../styles/theme';

const App = () => (
    <ThemeProvider theme={theme}>
        <AppNavBar />
    </ThemeProvider>
);

export default App;
