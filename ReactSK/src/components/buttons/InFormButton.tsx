import { Button } from "reactstrap";

interface InFormButtonProps {
    /** The text to display inside the button */
    children: React.ReactNode;
    /** The function to call when the button is clicked */
    onSelect: () => void;

    url: string;
  }

export default function InFormButton({children, onSelect, url}: InFormButtonProps) {
    return(
        <Button href={url}  type="submit" onClick={onSelect} className="  w-[320px] h-[120px] border-0  bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 text-lg  items-center flex justify-center ">
            {children}
        </Button>
    )
}; 