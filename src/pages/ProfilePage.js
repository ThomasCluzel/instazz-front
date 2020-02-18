import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
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
    // Style
    const classes = useAppStyle();

    // State
    const [ idRefresh, setIdRefresh ] = useState(0);
    const user = props.stateUser[0];

    // Event handlers
    const resetPostList = () => setIdRefresh(idRefresh + 1);
    
    if(!user) // if the user is not connected, we go back to the home page
        return (<Redirect to="/" />);

    return (
        <div className={classes.page} >
            <Typography variant={theme.props.pageTitleVariant}>
                Welcome to your profile page {user.pseudo}
            </Typography>
            <Typography variant={theme.props.pageTitleVariant}>
                Write a new post
            </Typography>
            <CreatePost stateUser={props.stateUser} resetPostList={resetPostList} />
            
            <Typography variant={theme.props.pageTitleVariant}>
                Your last posts
            </Typography>
            <PostList stateUser={props.stateUser} key={idRefresh} />
        </div>
    )
};

export default ProfilePage;
