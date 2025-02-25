import { useState, useEffect } from 'react';

export default function GameStats({ moves, onTimeUpdate }) {
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1)
                onTimeUpdate && onTimeUpdate(seconds + 1)
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [isActive, onTimeUpdate])

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    };

    return (
        <div className="flex justify-center gap-[30px] mt-10 lg:mt-3">
            <div className="bg-grey rounded-[10px] p-[16px] w-fit flex flex-row gap-[15px] lg:gap-[50px] items-center">
                <span className="text-steel-blue text-h3">Time</span>
                <span className="text-dark-blue text-h2 w-[70px] text-center">{formatTime(seconds)}</span>
            </div>
            <div className="bg-grey rounded-[10px] p-[16px] w-fit flex flex-row gap-[15px] lg:gap-[50px] items-center">
                <span className="text-steel-blue text-h3">Moves</span>
                <span className="text-dark-blue text-h2 w-[70px] text-center">{moves}</span>
            </div>
        </div>
    );
} 