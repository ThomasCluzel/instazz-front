import React, { useState } from 'react';
import { List, Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PostListItem from './PostListItem';
import InfiniteProgressBar from './InfiniteProgressBar';
import API from '../API';

/**
 * Improvement:
 * - Why not using media queries to set the number of posts to display per line?
 */

// Constants
const NUMBER_OF_INITIAL_POST = 12; // load 10 posts at the beginning
const NUMBER_OF_POST_TO_LOAD = NUMBER_OF_INITIAL_POST / 2; // each time the user reach the end

// Style
const useStyles = makeStyles({
    center: {
        display: "flex",
        justifyContent: "center"
    },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
});

/**
 * Display a list of posts
 * 
 * @param {*} props is { stateUser: [ user, setUser ] } or {}
 */
const PostList = (props) => {
    // style
    const classes = useStyles();

    // state
    const [ errorFromServer, setErrorFromServer ] = useState(false);
    const [ postList, setPostList ] = useState(null);
    const [ currentPageOfPosts, setCurrentPageOfPosts ] = useState(1);
    const [ showProgressBar, setShowProgressBar ] = useState(true);
    const [ alertShown, setAlertShown ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const user = props.stateUser ? props.stateUser[0] : null;

    // functions
    const loadPosts = (page, perPage, showError) => {
        let path = "posts";
        let query = `page=${page}&per_page=${perPage}`;
        if(user) { // if we want only the posts of the currently connected user
            path += "/myposts";
        }
        API.get(`${path}?${query}`).then(
            res => {
                // fetch and append more posts
                setShowProgressBar(false);
                setPostList(postList ? postList.concat(res.data.posts) : res.data.posts);
            },
            err => {
                // we do not want to bother the user with these errors
                if(showError) {
                    setErrorMsg(err+"");
                    setAlertShown(true);
                    setErrorFromServer(true);
                }
                else{
                    console.log("" + err);
                }
                setShowProgressBar(false);
            }
        );
    };

    // load the initial posts the first time only
    if(!postList) {
        setPostList([]);
        loadPosts(1, NUMBER_OF_INITIAL_POST, true);
    }

    // event listener
    window.onscroll = function(e) {
        if (!showProgressBar && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // the user has reached the bottom of the page (and read all posts)
            setShowProgressBar(true);
            setCurrentPageOfPosts(currentPageOfPosts + 1);
            loadPosts(currentPageOfPosts, NUMBER_OF_POST_TO_LOAD);
        }
    };

    return (
        <div>
            <Snackbar open={alertShown} autoHideDuration={5000} onClose={() => setAlertShown(false)}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>

            { errorFromServer ?
                <p className={classes.center}>{errorMsg}</p>
            :
                <List className={classes.list}>
                    { postList && postList.map( post => <PostListItem post={post} key={post._id} />) }
                </List>
            }

            <InfiniteProgressBar isVisible={showProgressBar && !errorFromServer} />
        </div>
    );
};

export default PostList;
