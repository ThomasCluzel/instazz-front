import React from 'react';
import { Typography } from '@material-ui/core';
import theme from '../styles/theme';
import PostList from '../components/PostList';

/**
 * The HomePage component is the home page of the app
 * it displays the list of recent posts.
 */
const HomePage = () => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant}>
            Recent posts on InstaZZ
        </Typography>
        <PostList />
    </div>
);

export default HomePage;
