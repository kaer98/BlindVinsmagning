import '../index.css';

interface StandardButtonProps { 
    children: React.ReactNode;
    isActiveBtn: Boolean; //Eksisterer ikke på nuværende tidspunkt.
    onSelect: () => void;
    className: string;

}

export default function StandardButton({children, onSelect, className}: StandardButtonProps) {
    // const disabledBtn = "bg-transparent text-black ";
    const classStuff = `${className} rounded-3xl bg-green-600 bg-opacity-800 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-800`


    return (
        <div className="mt-8 flex justify-center text-lg text-black">
        <button onClick={onSelect} className={classStuff}>{children}</button>
      </div>
    )
};