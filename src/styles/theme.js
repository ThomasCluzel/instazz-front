// The theme of the whole web site

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c62828'
        },
        secondary: {
            main: '#00bcd4'
        },
        error: {
            main: '#d50000'
        },
        warning: {
            main: '#f57c00'
        },
        info: {
            main: '#2196f3'
        },
        success: {
            main: '#43a047'
        },
        textPrimary: {
            main: '#212121'
        },
        textSecondary: {
            main: '#757575'
        },
    },
    status: {
        danger: 'red',
    },
    props: {
        variant: 'outlined',
        pageTitleVariant: 'h4'
    }
});
theme = responsiveFontSizes(theme);

export default theme;
