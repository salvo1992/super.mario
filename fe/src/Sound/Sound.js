import React, { useEffect } from 'react';

const Sound = ({ src, play }) => {
    useEffect(() => {
        const audio = new Audio(src);
        if (play) {
            audio.play();
        }
    }, [src, play]);

    return null;
};

export default Sound;
