import React from 'react';
import { Typography } from '@material-ui/core';
import theme from '../styles/theme';
import PostList from '../components/PostList';
import useAppStyle from '../styles/styles';

/**
 * The HomePage component is the home page of the app
 * it displays the list of recent posts.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const HomePage = (props) => {
    // Style
    const classes = useAppStyle();

    // State
    const user = props.stateUser[0];

    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant}>
                { user ? 
                    `Hi ${user.pseudo}, look at these recent posts on InstaZZ`
                    : "Recent posts on InstaZZ"
                }
            </Typography>
            <PostList />
        </div>
    )
};

export default HomePage;
