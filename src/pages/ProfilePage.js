import React from 'react';
import { Typography } from '@material-ui/core';
import PostList from '../components/PostList';
import theme from '../styles/theme';


/**
 * The ProfilePage component is the page that enables the user
 * to write new posts and see his/her posts.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const ProfilePage = (props) => (
    <div style={ {textAlign: "center"} }>
        <Typography variant={theme.props.pageTitleVariant}>
            Write a new post
        </Typography>
        <span>TODO: write post form</span>
        
        <Typography variant={theme.props.pageTitleVariant}>
            Your last posts
        </Typography>
        <PostList stateUser={props.stateUser} />
    </div>
);

export default ProfilePage;
