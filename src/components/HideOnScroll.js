import React from 'react';
import { useScrollTrigger, Slide } from '@material-ui/core';

/**
 * A component to hide its children components when
 * the user scrolls down.
 * The children are shown again when the user
 * scrolls up.
 * 
 * @param {*} props 
 */
const HideOnScroll = (props) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}

export default HideOnScroll;
