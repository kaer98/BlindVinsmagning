import { useEffect, useState } from "react"
import '../../index.css';
import SimpleButton from "../../components/SimpleButton";
import LoginOrSignupView from "./LoginOrSignupView";
import CreateView from "../createTasting/CreateView";
import axios from "axios";
import { ProfileCard } from "../../components/users/ProfileCard";
import UserForm from "../../components/users/UserForm";
import Tasting from "../../components/tastingComponents/Tasting";
import ListOfTastings from "./ListOfTastings";



function Home() {

    const [displayNameInput, setDisplayNameInput] = useState('Test Info');
    const [userNameInput, setUserNameInput] = useState();

    const [joinInfo, setJoinInfo] = useState<JSX.Element>();
    const [operationText, setOperationText] = useState<String>();
    const [games, setGames] = useState([]);
    const [error, setError] = useState();
    const [userData, setUserData] = useState({
        userName: '',
        displayName: ''
    });

    function postUser() {

        console.log(displayNameInput);

    }

    function changeSelect(changeInfo: string) {

        let outputInfo: JSX.Element;
        outputInfo = <h1></h1>

        if (changeInfo == 'join') {
            setOperationText('Log ind eller Opret Bruger')
            outputInfo = <div className="">
                <LoginOrSignupView />
            </div>

        }
        else if (changeInfo == 'opret') {
            setOperationText('Se kommende smagninger');
            outputInfo = <div className=" ">
                <ListOfTastings />
            </div>

        }



        setJoinInfo(outputInfo);
    }

    return (
        <div className="flex flex-col justify-center items-center text-white  ">


            <h1 className=" text-3xl mt-2 text-white ">
                Velkommen til IT Kartellet Vinsmagning! 😁

            </h1>


            <section id="choices">

            </section>
            <div className="m-10 flex flex-row items-center space-x-1 ">

                <SimpleButton onSelect={() => changeSelect('join')}>Log Ind</SimpleButton>
                <SimpleButton onSelect={() => changeSelect('opret')}>Smagninger</SimpleButton>
            </div>
            <h1 className="m-2 font-bold text-white">{operationText}</h1>

            {!joinInfo ? <h1 className="text-white">Velkommen til IT Kartellet vinsmagning. Vælg enten Log Ind eller Smagninger for at fortsætte.</h1> : joinInfo}



        </div>


    )

}

export default Home