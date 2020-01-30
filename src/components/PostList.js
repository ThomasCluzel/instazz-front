import React from 'react';
import { List } from '@material-ui/core';
import PostListItem from './PostListItem';

/**
 * TODOs:
 * - Query the api to fetch real posts
 * - Maybe a props to know if we need to fetch
 *   - all the recent posts
 *   - only the user's posts
 *   - some specific posts
 */

const PostList = () => {
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

    return (
        <List>
            { posts.map( post => <PostListItem post={post} key={post._id} />) }
        </List>
    );
};

export default PostList;
