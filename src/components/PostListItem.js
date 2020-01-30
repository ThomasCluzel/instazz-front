import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

/**
 * TODOs:
 * - Why not a link on the author of the post to visit his/her profile
 */

// NavBar style
const useStyle = makeStyles(theme => ({
    post: {
        textAlign: "left",
        border: "1pt solid " + theme.palette.primary.main,
        borderRadius: "10px",
        margin: "4px",
        padding: "8px"
    },
    author: {
        fontSize: "large"
    }
}));

const PostListItem = ({post}) => {
    const classes = useStyle();

    return (
        <Container maxWidth="md" className={classes.post}>
            <p className={classes.author}>
                Posted by {post.author.pseudo}
            </p>
            <img src={post.image.filename} alt={"posted by " + post.author.pseudo} width="100%" />
            <p>
                {post.description}
            </p>
        </Container>
    );
};

export default PostListItem;
