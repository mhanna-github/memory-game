import { useState } from "react";
import Button from "../button/Button";

export default function GameOptions() {
    const [activeTheme, setActiveTheme] = useState(null);
    const [activePlayers, setActivePlayers] = useState(null);
    const [activeGridSize, setActiveGridSize] = useState(null);

    const handleStartGame = () => {
        if (!activeTheme || !activePlayers || !activeGridSize) {
            alert('Please select all options before starting the game')
            return
        }
        
        console.log('Starting game with:', {
            theme: activeTheme,
            players: activePlayers,
            gridSize: activeGridSize
        });
        // TODO: Add game start logic
    };

    return (
        <div className="w-full max-w-[700px] px-[24px] md:px-[56px] flex flex-col">
            <h1 className="text-h1 text-white text-center mb-[30px] animate-fadeIn">memory</h1>
            <div className="bg-white flex flex-col gap-[30px] lg:gap-[56px] p-[24px] lg:p-[46px] lg:rounded-xl rounded-lg
                transform transition-all duration-300 ease-in-out hover:shadow-xl animate-slideUp">
                <div className="">
                    <h2 className="text-h3 text-steel-blue pb-[10px] lg:pb-[15px]">Select Theme</h2>
                    <div className="flex flex-row gap-[16px]">
                        <Button 
                        text="Numbers" 
                        variant="primary" 
                        isActive={activeTheme === 'numbers'}
                        onClick={() => setActiveTheme('numbers')} />
                        <Button 
                        text="Icons" 
                        variant="primary" 
                        isActive={activeTheme === 'icons'}
                        onClick={() => setActiveTheme('icons')} />
                    </div>
                </div>
                <div className="">
                    <h2 className="text-h3 text-steel-blue pb-[10px] lg:pb-[15px]">Number of Players</h2>
                    <div className="flex flex-row gap-[16px]">
                        <Button 
                        text="1" 
                        variant="primary" 
                        isActive={activePlayers === '1'}
                        onClick={() => setActivePlayers('1')} />
                        <Button 
                        text="2" 
                        variant="primary" 
                        isActive={activePlayers === '2'}
                        onClick={() => setActivePlayers('2')} />
                        <Button 
                        text="3" 
                        variant="primary" 
                        isActive={activePlayers === '3'}
                        onClick={() => setActivePlayers('3')} />
                    </div>
                </div>
                <div className="">
                    <h2 className="text-h3 text-steel-blue pb-[10px] lg:pb-[15px]">Grid Size</h2>
                    <div className="flex flex-row gap-[16px]">
                        <Button 
                        text="4x4" 
                        variant="primary" 
                        isActive={activeGridSize === '4x4'}
                        onClick={() => setActiveGridSize('4x4')} />
                        <Button 
                        text="6x6" 
                        variant="primary" 
                        isActive={activeGridSize === '6x6'}
                        onClick={() => setActiveGridSize('6x6')} />
                    </div>
                </div>
                <Button 
                    text="Start Game" 
                    variant="secondary"
                    onClick={handleStartGame} />
            </div>
        </div>
    )
}
