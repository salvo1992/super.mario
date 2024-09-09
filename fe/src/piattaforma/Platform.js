import React from 'react';
import './Platform.css';

const Platform = ({ position }) => {
    return (
        <div 
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: '200px', // Larghezza fissa
                height: '20px',  // Altezza fissa
                backgroundColor: 'brown'
            }}>
        </div>
    );
};

export default Platform;
