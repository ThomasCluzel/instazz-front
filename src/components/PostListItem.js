import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import theme from '../styles/theme';

/**
 * Improvements:
 * - Why not adding a link on the author's pseudo to visit his/her profile?
 */

const PostListItem = ({post}) => (
    <Card variant={theme.props.variant}>
        <CardMedia
            component="img"
            src={'data:image/png;base64,' + post.imageData}
            alt={post.image.filename}
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
