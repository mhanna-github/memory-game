export default function Button({ text, onClick, variant, isActive, fullWidth = true, fontSize = true }) {

    const variantClasses = {    
        primary: `cursor-pointer px-3 lg:px-2 py-3 lg:py-3 rounded-full text-button
            transform transition-all duration-200 ease-in-out
            ${fullWidth ? 'w-full' : 'px-8'} 
            ${isActive 
                ? "bg-dark-blue text-white scale-95" 
                : "bg-light-blue text-white hover:bg-sky-blue"
            }`,
        secondary: `cursor-pointer px-3 lg:px-2 py-3 lg:py-3 rounded-full text-h2
            transform transition-all duration-200 ease-in-out
            ${fullWidth ? 'w-full' : 'w-[125px]'}
            ${fontSize ? 'text-h2' : 'text-h3'}
            ${isActive 
                ? "bg-light-yellow text-white scale-95" 
                : "bg-yellow text-white hover:bg-light-yellow"
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
