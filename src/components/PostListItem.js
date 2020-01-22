import React from 'react';
import { makeStyles } from '@material-ui/core';

/**
 * TODOs:
 * - Better UI
 */

// NavBar style
const useStyle = makeStyles(theme => ({
    post: {
        textAlign: "center",
        minWidth: "40vw",
        maxWidth: "70vw"
    },
    author: {
        textAlign: "right"
    }
}));

const PostListItem = ({post}) => {
    const classes = useStyle();

    return (
        <div className={classes.post}>
            <img src={post.image.filename} alt="" width="100%" />
            <p>
                {post.description}
            </p>
            <p className={classes.author}>
                {post.author.pseudo}
            </p>
        </div>
    );
};

export default PostListItem;
