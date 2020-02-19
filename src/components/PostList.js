import React, { useState } from 'react';
import { Snackbar, makeStyles, GridList, GridListTile } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PostListItem from './PostListItem';
import InfiniteProgressBar from './InfiniteProgressBar';
import API from '../API';

/**
 * Improvement:
 * - Why not using media queries to set the number of posts to display per line?
 * - Why not using a timer to check if new posts have been posted?
 */

// Constants
const NUMBER_OF_LINES_TO_LOAD = 3; // each time the API is queried
const computeNumberOfPostsPerLine = (width) => Math.round(width * 0.8 / 300);

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
 * @param {*} props is { stateUser: [ user, setUser ] } or {}
 */
const PostList = (props) => {
    // style
    const classes = useStyles();

    // state
    const [ errorFromServer, setErrorFromServer ] = useState(false);
    const [ postList, setPostList ] = useState(null);
    const [ currentPageOfPosts, setCurrentPageOfPosts ] = useState(0);
    const [ endReached, setEndReached ] = useState(false);
    const [ showProgressBar, setShowProgressBar ] = useState(true);
    const [ alertShown, setAlertShown ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const user = props.stateUser ? props.stateUser[0] : null;

    // Compute the number of columns of post to display
    const numberOfPostsPerLine = computeNumberOfPostsPerLine(window.innerWidth);

    // functions
    const loadPosts = (showError) => {
        // query parameters
        const page = currentPageOfPosts + 1; // fetch next page of post
        setCurrentPageOfPosts(page);
        const perPage= numberOfPostsPerLine * NUMBER_OF_LINES_TO_LOAD;

        let path = "posts";
        let query = `page=${page}&per_page=${perPage}`;
        let config = {};
        if(user) { // if we want only the posts of the currently connected user
            path += "/myposts";
            const token = window.localStorage.getItem("token");
            config = {
                headers: { Authorization: token }
            };
        }
        API.get(`${path}?${query}`, config).then(
            res => {
                // fetch and append more posts
                setShowProgressBar(false);
                setPostList(postList ? postList.concat(res.data.posts) : res.data.posts);
                if(res.data.posts.length === 0) // end of the list reached
                    setEndReached(true);
            },
            err => {
                // we do not want to bother the user with these errors
                if(showError) {
                    setErrorMsg("" + err);
                    setAlertShown(true);
                    setErrorFromServer(true);
                }
                console.log("" + err);
                setShowProgressBar(false);
            }
        );
    };

    // load some initial posts
    if(!postList) {
        setPostList([]);
        loadPosts(true);
    }

    // event listener
    window.onscroll = () => {
        if (!endReached && !showProgressBar && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // the user has reached the bottom of the page (and read all posts)
            setShowProgressBar(true);
            loadPosts(); // fetch more to keep the user on our app
        }
    };

    return (
        <div>
            <Snackbar open={alertShown} autoHideDuration={5000} onClose={() => setAlertShown(false)}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>

            { errorFromServer ?
                <p className={classes.center}>{errorMsg}</p>
            : postList && postList.length > 0 ?
                <GridList cols={numberOfPostsPerLine} cellHeight="auto" spacing={10}>
                    { postList.map( post => (
                        <GridListTile key={post._id}>
                            <PostListItem post={post} />
                        </GridListTile>
                    )) }
                </GridList>
            :   <p>
                    { user ? "You have not posted anything yet." : "No post were found." }
                </p>
            }

            <InfiniteProgressBar isVisible={showProgressBar && !errorFromServer} />
        </div>
    );
};

export default PostList;
