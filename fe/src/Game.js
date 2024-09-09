import React, { useState, useEffect } from 'react';
import Player from './player/Player';
import Platform from './piattaforma/Platform';
import Enemy from './Enemy/Enemy';
import Coin from './Coin/Coin';
import PowerUp from './PowerUp/PowerUp';
import './Game.css';
import Sound from './Sound/Sound';

// Fattore di ridimensionamento globale
const scaleFactor = 0.05;

// Funzione per generare le piattaforme
const generatePlatforms = (numPlatforms) => {
    let platforms = [];
    for (let i = 0; i < numPlatforms; i++) {
        let x = Math.random() * (window.innerWidth * scaleFactor - 100);
        let y = Math.random() * (window.innerHeight * scaleFactor - 200);
        platforms.push({ x, y });
    }
    return platforms;
};

// Funzione per generare i nemici
const generateEnemies = (numEnemies) => {
    let enemies = [];
    for (let i = 0; i < numEnemies; i++) {
        let x = Math.random() * (window.innerWidth * scaleFactor - 50);
        let y = Math.random() * (window.innerHeight * scaleFactor - 200);
        enemies.push({ x, y });
    }
    return enemies;
};

// Funzione per generare le monete
const generateCoins = (numCoins) => {
    let coins = [];
    for (let i = 0; i < numCoins; i++) {
        let x = Math.random() * (window.innerWidth * scaleFactor - 30);
        let y = Math.random() * (window.innerHeight * scaleFactor - 200);
        coins.push({ x, y, collected: false });
    }
    return coins;
};

// Funzione per generare i potenziamenti
const generatePowerUps = (numPowerUps) => {
    const types = ['star', 'fire', 'ice', 'leaf', 'wings', 'mushroom-small', 'mushroom-medium', 'mushroom-large'];
    let powerUps = [];
    for (let i = 0; i < numPowerUps; i++) {
        let x = Math.random() * (window.innerWidth * scaleFactor - 30);
        let y = Math.random() * (window.innerHeight * scaleFactor - 200);
        let type = types[Math.floor(Math.random() * types.length)];
        powerUps.push({ x, y, type });
    }
    return powerUps;
};

// Funzione per gestire i potenziamenti
const handlePowerUp = (type) => {
    switch (type) {
        case 'star':
            // Imposta invincibilità per un tempo limitato
            break;
        case 'fire':
            // Abilita il potere del fuoco
            break;
        case 'ice':
            // Abilita il potere del ghiaccio
            break;
        case 'leaf':
            // Abilita la trasformazione in foglia
            break;
        case 'wings':
            // Permetti al giocatore di volare
            break;
        case 'mushroom-small':
            // Aumenta la vita
            break;
        case 'mushroom-medium':
            // Aumenta la grandezza del giocatore
            break;
        case 'mushroom-large':
            // Aumenta notevolmente la grandezza del giocatore
            break;
        default:
            break;
    }
};

// Funzione per generare un livello completo
const generateLevel = () => {
    return {
        platforms: generatePlatforms(5),  // numero di piattaforme
        enemies: generateEnemies(3),       // numero di nemici
        coins: generateCoins(10),          // numero di monete
        powerUps: generatePowerUps(3)      // numero di potenziamenti
    };
};

// Componente principale del gioco
const Game = () => {
    const [level, setLevel] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(generateLevel());
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [coins, setCoins] = useState(currentLevel.coins);
    const [powerUps, setPowerUps] = useState(currentLevel.powerUps);
    const [score, setScore] = useState(0);
    const [platforms, setPlatforms] = useState([{ x: 100, y: 300 }, { x: 400, y: 200 }]);

    useEffect(() => {
        setCurrentLevel(generateLevel());
    }, [level]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    setPlayerPosition(prev => ({ ...prev, x: prev.x - 5 }));
                    break;
                case 'ArrowRight':
                    setPlayerPosition(prev => ({ ...prev, x: prev.x + 5 }));
                    break;
                case 'ArrowUp':
                    setPlayerPosition(prev => ({ ...prev, y: prev.y - 5 }));
                    break;
                case 'ArrowDown':
                    setPlayerPosition(prev => ({ ...prev, y: prev.y + 5 }));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        // Controllo per raccogliere i potenziamenti
        powerUps.forEach((powerUp, index) => {
            if (
                playerPosition.x < powerUp.x + 30 * scaleFactor &&
                playerPosition.x + 50 * scaleFactor > powerUp.x &&
                playerPosition.y < powerUp.y + 30 * scaleFactor &&
                playerPosition.y + 50 * scaleFactor > powerUp.y
            ) {
                handlePowerUp(powerUp.type);
                setPowerUps(prevPowerUps => prevPowerUps.filter((_, i) => i !== index));
            }
        });
    }, [playerPosition, powerUps]);

    return (
        <div className="game">
            <Player position={playerPosition} />
            {currentLevel.platforms.map((platform, index) => (
                <Platform key={index} position={platform} />
            ))}
            {currentLevel.enemies.map((enemy, index) => (
                <Enemy key={index} position={enemy} />
            ))}
            {coins.map((coin, index) =>
                !coin.collected && <Coin key={index} position={{ x: coin.x, y: coin.y }} />
            )}
            {powerUps.map((powerUp, index) => (
                <PowerUp key={index} type={powerUp.type} position={{ x: powerUp.x, y: powerUp.y }} />
            ))}
            <div className="score">Score: {score}</div>
            <Sound src="/assets/sound-game.mp3" play={true} />
            {coins.some(coin => coin.collected) && <Sound src="/assets/coin-sound.mp3" play={true} />}
        </div>
    );
};

export default Game;
