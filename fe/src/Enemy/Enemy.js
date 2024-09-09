import React from 'react';
import './Enemy.css';

const Enemy = ({ position }) => {
    return (
        <div className="enemy" style={{ left: position.x, top: position.y }}>
            <img src="/assets/enemy.png" alt="Enemy" />
        </div>
    );
};

export default Enemy;
