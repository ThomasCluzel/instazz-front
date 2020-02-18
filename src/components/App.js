import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import PageContainer from './PageContainer';
import theme from '../styles/theme';

const App = () => (
    <ThemeProvider theme={theme}>
        <PageContainer />
    </ThemeProvider>
);

export default App;
