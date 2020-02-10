import React, { useState } from 'react';
import { List, Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PostListItem from './PostListItem';
import InfiniteProgressBar from './InfiniteProgressBar';
import API from '../API';

/**
 * TODOs:
 * - Maybe a props to know if we need to fetch (reason to add props)
 *   - all the recent posts
 *   - only the user's posts
 *   - some specific posts
 */

// Constants
const NUMBER_OF_INITIAL_POST = 10; // load 10 posts at the beginning
const NUMBER_OF_POST_TO_LOAD = NUMBER_OF_INITIAL_POST / 2; // each time the user reach the end

// Style
const useStyles = makeStyles({
    center: {
        display: "flex",
        justifyContent: "center"
    }
});

/**
 * Display a list of posts
 * 
 * @param {*} props is { stateUser: [ user, setUser ] }
 */
const PostList = () => {
    // style
    const classes = useStyles();

    // state
    const [ errorFromServer, setErrorFromServer ] = useState(false);
    const [ postList, setPostList ] = useState(null);
    const [ currentPageOfPosts, setCurrentPageOfPosts ] = useState(1);
    const [ showProgressBar, setShowProgressBar ] = useState(true);
    const [ alertShown, setAlertShown ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');

    // functions
    const loadPosts = (page, perPage, showError) => {
        API.get(`posts?page=${page}&per_page=${perPage}`).then(
            res => {
                // fetch and append more posts
                setShowProgressBar(false);
                setPostList(postList.concat(res.data));
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
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // the user has reached the bottom of the page (and read all posts)
            setCurrentPageOfPosts(currentPageOfPosts + 1);
            setShowProgressBar(true);
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
                <List>
                    { postList && postList.map( post => <PostListItem post={post} key={post._id} />) }
                </List>
            }

            <InfiniteProgressBar isVisible={showProgressBar && !errorFromServer} />
        </div>
    );
};

export default PostList;
