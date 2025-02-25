import React, { useState, useEffect } from 'react';

function Game() {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('memoryGameState'); 
    return saved ? JSON.parse(saved) : {
      moves: 0,
      pairs: [],
      cards: [], 
    };
  });

  useEffect(() => {
    localStorage.setItem('memoryGameState', JSON.stringify(gameState));
  }, [gameState]);

  const resetGame = () => {
    localStorage.removeItem('memoryGameState');
    setGameState({
      moves: 0,
      pairs: [],
      cards: [], 
    });
  };
}

export default Game
