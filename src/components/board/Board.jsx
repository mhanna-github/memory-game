import { useState, useEffect } from 'react';
import Button from '../button/Button';
import GameStats from '../gameStats/GameStats';

export default function Board({ gridSize, onRestart }) {
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedPairs, setMatchedPairs] = useState([])
    const [canFlip, setCanFlip] = useState(true)
    const [moves, setMoves] = useState(0);
    const [gameTime, setGameTime] = useState(0);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateCards = () => {
        const pairsCount = gridSize === '4x4' ? 8 : 18;
        const numbers = Array.from({ length: pairsCount }, (_, i) => i + 1);
        
 
        const firstHalf = shuffle([...numbers])
        const secondHalf = shuffle([...numbers])
        
  
        const pairs = [];
        for (let i = 0; i < numbers.length; i++) {
        
            if (Math.random() > 0.5) {
                pairs.push(firstHalf[i])
                pairs.push(secondHalf[i])
            } else {
                pairs.push(secondHalf[i])
                pairs.push(firstHalf[i])
            }
        }
        

        return shuffle(pairs).map((number, index) => ({
            id: index,
            value: number,
            isFlipped: false,
            isMatched: false
        }));
    };

    useEffect(() => {
        const savedBoardState = localStorage.getItem('memoryBoardState')
        if (savedBoardState) {
            const { cards, matched, moves: savedMoves, time } = JSON.parse(savedBoardState)
            if (cards) {
                setCards(cards.map(card => ({
                    ...card,
                    isFlipped: false
                })))
            } else {
                setCards(generateCards())
            }
            setMatchedPairs(matched)
            setMoves(savedMoves || 0)
            setGameTime(time || 0)
        } else {
            setCards(generateCards())
        }
    }, [gridSize])

    useEffect(() => {
        if (cards.length > 0) {
            localStorage.setItem('memoryBoardState', JSON.stringify({
                cards,
                matched: matchedPairs,
                moves,
                time: gameTime
            }))
        }
    }, [cards, matchedPairs, moves, gameTime])

    const handleCardClick = (cardId) => {
        if (!canFlip) return

        setMoves(moves => moves + 1);
        
        const clickedCard = cards.find(card => card.id === cardId)
        if (clickedCard.isFlipped || clickedCard.isMatched) return

        const updatedCards = cards.map(card => 
            card.id === cardId ? { ...card, isFlipped: true } : card
        );
        setCards(updatedCards)

        const newFlippedCards = [...flippedCards, clickedCard]
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {
            setCanFlip(false)
            
            setTimeout(() => {
                const [firstCard, secondCard] = newFlippedCards;
                
                if (firstCard.value === secondCard.value) {
                 
                    setCards(cards => cards.map(card => 
                        card.id === firstCard.id || card.id === secondCard.id
                            ? { ...card, isMatched: true }
                            : card
                    ))
                    setMatchedPairs([...matchedPairs, firstCard.value]);
                } else {
                 
                    setCards(cards => cards.map(card => 
                        card.id === firstCard.id || card.id === secondCard.id
                            ? { ...card, isFlipped: false }
                            : card
                    ))
                }
                setFlippedCards([])
                setCanFlip(true)
            }, 600)
        }
    };

    return (
        <div className="w-full lg:px-[156px] lg:py-[25px] py-[10px]">
            <div className="flex flex-row justify-between items-center mb-10 lg:mb-1">
                <h1 className="text-h1 text-dark-blue">memory</h1>
                <Button 
                    onClick={() => {
                        setFlippedCards([]);
                        setCanFlip(true);
                        setMatchedPairs([]);
                        setCards(generateCards());
                        setMoves(0); 
                        localStorage.removeItem('memoryBoardState');
                        onRestart();
                    }}
                    text="Restart"
                    variant="secondary"
                    fullWidth={false}
                    fontSize={false}
                />
            </div>
            <div className="flex justify-center">
                <div className={`grid ${gridSize === '4x4' ? 'grid-cols-4' : 'grid-cols-6'} 
                    max-w-[700px] lg:gap-[10px] gap-[10px] lg:p-[20px] p-0 w-full`}>
                    {cards.map(card => (
                        <button
                            key={card.id}
                            className={`cursor-pointer aspect-square rounded-full flex items-center justify-center
                                transform transition-all duration-250 ease-in-out
                                text-[24px] md:text-game-4
                                ${card.isMatched 
                                    ? "bg-yellow text-white"
                                    : card.isFlipped
                                        ? "bg-light-blue text-white"
                                        : "bg-slate-blue text-white hover:bg-sky-blue"}`}
                            onClick={() => handleCardClick(card.id)}
                            disabled={!canFlip}
                        >
                            {(card.isFlipped || card.isMatched) && card.value}
                        </button>
                    ))}
                </div>
            </div>
              <GameStats 
                moves={moves} 
                onTimeUpdate={setGameTime}
                savedTime={gameTime}
              />
        </div>
    );
}
