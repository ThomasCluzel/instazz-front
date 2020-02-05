import React, { useState, useEffect } from 'react';
import { List, Snackbar, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PostListItem from './PostListItem';
import API from '../API';

/**
 * TODOs:
 * - Each time the user reach the bottom of the page, load more posts (to keep in on our web site ahahah)
 * - Better and more beautiful error message
 * - Maybe a props to know if we need to fetch
 *   - all the recent posts
 *   - only the user's posts
 *   - some specific posts
 */

// Constants
const NUMBER_OF_INITIAL_POST = 10; // load 10 posts at the beginning
const NUMBER_OF_POST_TO_LOAD = NUMBER_OF_INITIAL_POST / 2; // each time the user reach the end

/*
let onePost = {
    _id: 0,
    image: {
        data: "", // metadata
        contentType: "image/jpeg", // MIME type
        filename: "https://upload.wikimedia.org/wikipedia/commons/5/55/Pont_Jacques-Bizard_%28Sainte-Genevi%C3%A8ve%29.jpg" // url
    },
    description: "This is the content of the post aka the description", // text posted
    author: {
        name: "John Doe",
        pseudo: "Jacky"
    }
}
let posts = [];
for(let i = 0; i < 3; i++)
{
    posts.push({...onePost,_id: i});
}
*/

const PostList = () => {
    // state
    const [ isLoading, setIsLoading ] = useState(true); // when the user comes to the page, we load the posts
    const [ errorFromServer, setErrorFromServer ] = useState(false);
    const [ postList, setPostList ] = useState([]);
    const [ alertShown, setAlertShown ] = React.useState(false);
    const [ errorMsg, setErrorMsg ] = React.useState('');

    // effect, we only need to load the posts once
    useEffect(() => {
        // Get the initial list of posts from the API
        API.get(`posts?page=1&per_page=${NUMBER_OF_INITIAL_POST}`).then(
            res => {
                setPostList(res.data.posts);
                setIsLoading(false); // posts have been loaded
            },
            err => {
                // in case of errors, we display the error in a Snackbar
                setErrorMsg(err+"");
                setAlertShown(true);
                setIsLoading(false);
                setErrorFromServer(true);
            }
        );
    });

    return (
        <div>
            <Snackbar open={alertShown} autoHideDuration={5000} onClose={() => setAlertShown(false)}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>

            { isLoading ?
                <CircularProgress color="secondary" />
            : errorFromServer ?
                <p>There was an error</p>
            :
                <List>
                    { postList.map( post => <PostListItem post={post} key={post._id} />) }
                </List>
            }
        </div>
    );
};

export default PostList;
