import { useState, useEffect } from 'react';

export default function GameStats({ moves, onTimeUpdate, savedTime = 0 }) {
    const [seconds, setSeconds] = useState(savedTime);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (moves === 0) {
            setSeconds(0);
            onTimeUpdate(0);
        }
    }, [moves, onTimeUpdate]);

    useEffect(() => {
        if (savedTime > 0) {
            setSeconds(savedTime);
        }
    }, [savedTime]);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                onTimeUpdate(seconds + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, onTimeUpdate, seconds]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex justify-center gap-[24px] lg:mt-[13px] mt-10">
            <div className="bg-grey rounded-[10px] p-[16px] w-fit flex flex-row lg:gap-[50px] gap-[15px] items-center">
                <span className="text-steel-blue text-h3">Time</span>
                <span className="text-dark-blue text-h2 w-[70px] text-center">{formatTime(seconds)}</span>
            </div>
            <div className="bg-grey rounded-[10px] p-[16px] w-fit flex flex-row gap-[50px] items-center">
                <span className="text-steel-blue text-h3">Moves</span>
                <span className="text-dark-blue text-h2 w-[70px] text-center">{moves}</span>
            </div>
        </div>
    );
}