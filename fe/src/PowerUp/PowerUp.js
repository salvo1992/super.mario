import React from 'react';
import './PowerUp.css';

const PowerUp = ({ type, position }) => {
    return (
        <div className={`power-up ${type}`} style={{ left: position.x, top: position.y }}>
            <img src={`/assets/${type}.png`} alt={type} />
        </div>
    );
};

export default PowerUp;
