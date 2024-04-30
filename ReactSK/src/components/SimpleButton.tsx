
import React from 'react';

interface SimpleButtonProps { 
    children?: React.ReactNode;
    onSelect?: () => void;
    className?: string;
    divClass?: string;

}


export default function SimpleButton({ children, onSelect, className, divClass }: SimpleButtonProps) {

    let addClass = `${className} w-[140px] hover:bg-indigo-700 hover:text-black hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2 `
    let addDivClass = ` ${divClass} flex justify-center lg:justify-start  `
    return (
        <div className={addDivClass}>
            <a href="#" onClick={onSelect} className={addClass}>{children}</a>
        </div>
    )
};