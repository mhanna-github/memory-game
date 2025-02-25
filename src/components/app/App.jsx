import { useState, useEffect } from "react";
import GameOptions from "../gameOptions/GameOptions";
import Board from "../board/Board";

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOptions, setGameOptions] = useState(null);

    useEffect(() => {
        const savedState = localStorage.getItem('memoryGameState');
        if (savedState) {
            const { isStarted, options } = JSON.parse(savedState);
            setGameStarted(isStarted);
            setGameOptions(options);
        }
    }, []);

    const handleStartGame = (options) => {
        setGameOptions(options);
        setGameStarted(true);

        localStorage.setItem('memoryGameState', JSON.stringify({
            isStarted: true,
            options
        }));
    };

    return (
        <main className={`min-h-screen w-full px-[24px] flex items-center justify-center 
            transition-colors duration-500 ease-in-out
            ${gameStarted ? 'bg-off-white' : 'bg-dark-blue'}`}>
            {!gameStarted ? (
                <GameOptions onStartGame={handleStartGame} />
            ) : (
                <Board 
                    gridSize={gameOptions.gridSize}
                    onRestart={() => {
                        localStorage.removeItem('memoryGameState');
                        setGameStarted(false);
                        setGameOptions(null);
                    }}
                />
            )}
        </main>
    );
}
