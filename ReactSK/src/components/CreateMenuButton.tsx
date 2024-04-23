import { Button } from "reactstrap";

interface CreateMenuButtonProps {
    url?: string;
    imgUrl?: string;
    imgRadius?: number;
    children?: React.ReactNode;

}

export default function CreateMenuButton({ url, imgUrl, imgRadius, children }: CreateMenuButtonProps) {




    return (



        <Button className="flex justify-center rounded-full border-0 bg-green-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-600" href={url} >
            <div>
                <img className="ml-8" src={imgUrl} style={{ borderRadius: `${imgRadius}px` }} width="50" height="50" />
                <p className="cardText font-black text-black mb-4">{children}</p>
            </div>
        </Button>


    )
}