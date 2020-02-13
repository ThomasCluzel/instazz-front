import React from 'react';
import { Typography } from '@material-ui/core';
import theme from '../styles/theme';
import PostList from '../components/PostList';
import useAppStyle from '../styles/styles';

/**
 * The HomePage component is the home page of the app
 * it displays the list of recent posts.
 */
const HomePage = () => {
    // style
    const classes = useAppStyle();

    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant}>
                Recent posts on InstaZZ
            </Typography>
            <PostList />
        </div>
    )
};

export default HomePage;
