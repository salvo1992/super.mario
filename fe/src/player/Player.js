import React from 'react';
import './Player.css';

const Player = ({ position }) => {
    return (
        <div 
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '20px',
                height: '20px',
                backgroundImage: 'url(/path/to/Mario Paper Mario-Style.png)',
                backgroundSize: 'cover'
            }}>
        </div>
    );
};

export default Player;
