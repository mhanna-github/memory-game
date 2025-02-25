import { useState } from "react";
import GameOptions from "../gameOptions/GameOptions";

export default function App() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    }

    return (
        <main className="bg-dark-blue min-h-screen w-full flex items-center justify-center">
            <GameOptions />
        </main>
    )
}
