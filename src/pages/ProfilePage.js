import React from 'react';
import { Typography } from '@material-ui/core';
import PostList from '../components/PostList';
import theme from '../styles/theme';
import CreatePost from '../components/CreatePost';
import useAppStyle from '../styles/styles';

/**
 * The ProfilePage component is the page that enables the user
 * to write new posts and see his/her posts.
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const ProfilePage = (props) => {
    // style
    const classes = useAppStyle();

    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant}>
                Write a new post
            </Typography>
            <CreatePost stateUser={props.stateUser} />
            
            <Typography variant={theme.props.pageTitleVariant}>
                Your last posts
            </Typography>
            <PostList stateUser={props.stateUser} />
        </div>
    )
};

export default ProfilePage;
