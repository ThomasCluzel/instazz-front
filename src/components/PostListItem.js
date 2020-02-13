import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import theme from '../styles/theme';

/**
 * Improvements:
 * - Why not a link on the author of the post to visit his/her profile
 */

// Style (don't need makeStyle)
const cardStyle = {
    width: "30%",
    marginBottom: "2%"
};

const PostListItem = ({post}) => (
    <Card variant={theme.props.variant} style={cardStyle} >
        <CardMedia
            component="img"
            image={post.image.filename}
            alt={"posted by " + post.author.pseudo}
        />
        <CardContent>
            <Typography variant="h6" color="textPrimary">
                Posted by {post.author.pseudo}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
            </Typography>
        </CardContent>
    </Card>
);

export default PostListItem;
