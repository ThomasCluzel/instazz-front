import React from 'react';
import { render } from '@testing-library/react';
import PostListItem from '../components/PostListItem';

test('Display a post', () => {
    const post = {
        imageData: "xxx",
        image: {
            filename: "aaa"
        },
        author: {
            pseudo: "John"
        },
        description: "a description of a post"
    };
    const item = render(<PostListItem post={post} />);

    expect(item.getByText("Posted by John")).toBeInTheDocument();
    expect(item.getByText("a description of a post")).toBeInTheDocument();
});
