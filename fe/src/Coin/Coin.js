import React from 'react';
import './Coin.css';

const Coin = ({ position }) => {
    return (
        <div className="coin" style={{ left: position.x, top: position.y }}>
            <img src="coin.png" alt="Coin" style={{ width: '20px', height: '20px' }} />
        </div>
    );
};

export default Coin;
