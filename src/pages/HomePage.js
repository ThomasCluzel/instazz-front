import React from 'react';
import { Typography } from '@material-ui/core';
import theme from '../styles/theme';
import PostList from '../components/PostList';

/**
 * The HomePage component is the home page of a user
 * it displays a list of posts.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const HomePage = (props) => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant}>
            Recent posts on InstaZZ
        </Typography>
        <PostList stateUser={props.stateUser} />
    </div>
);

export default HomePage;
