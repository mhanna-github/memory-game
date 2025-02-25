export default function Button({ text, onClick, variant, isActive }) {

    const variantClasses = {    
        primary: `cursor-pointer p-3 lg:p-2 rounded-full w-full text-button
            transform transition-all duration-200 ease-in-out
            ${isActive 
                ? "bg-dark-blue text-white scale-95" 
                : "bg-light-blue text-white hover:bg-sky-blue hover:scale-105"
            }`,
        secondary: `cursor-pointer p-3 lg:p-2 rounded-full w-full text-h2
            transform transition-all duration-200 ease-in-out
            ${isActive 
                ? "bg-light-yellow text-white scale-95" 
                : "bg-yellow text-white hover:bg-light-yellow hover:scale-105"
            }`,
    }

    return (
        <button 
            className={`${variantClasses[variant]} active:scale-95`} 
            onClick={onClick}>
            {text}
        </button>
    );
}
