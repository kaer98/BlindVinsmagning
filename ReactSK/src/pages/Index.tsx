import { useEffect, useState } from "react"
import '../index.css';
import SimpleButton from "../components/SimpleButton";
import JoinView from "../components/pagecomponents/index/JoinView";
import CreateView from "../components/pagecomponents/index/CreateView";
import axios from "axios";
import { ProfileCard } from "../components/users/ProfileCard";
import UserForm from "../components/users/UserForm";
import TastingsList from "../components/pagecomponents/index/TastingsList";



function Index() {

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



    // useEffect(() => {
    //     axios.get("http://localhost:3000/users")
    //         .then(res => {
    //             setGames(res.data);
    //         }).catch(error => {
    //             setError("Der er sket en fejl..");
    //         })
    // }, []);


    function changeSelect(changeInfo: string) {

        let outputInfo: JSX.Element;
        outputInfo = <h1></h1>

        if (changeInfo == 'join') {
            setOperationText('Log ind eller Opret Bruger')
            outputInfo = <JoinView />

        }
        else if (changeInfo == 'opret') {
            setOperationText('Se kommende smagninger');
            outputInfo = <TastingsList />

        }

     

        setJoinInfo(outputInfo);
    }

    return (
        <div className="flex flex-col justify-center  items-center">
            <h1 className=" text-3xl mt-2 text-white">
                Velkommen til IT Kartellet Vinsmagning! 😁

            </h1>

            {/* <ProfileCard/>
            <UserForm/> */}
            <section id="choices">

            </section>
            <div className="m-10 flex flex-row items-center space-x-1 ">

                <SimpleButton onSelect={() => changeSelect('join')}>Log Ind</SimpleButton>
                <SimpleButton onSelect={() => changeSelect('opret')}>Smagninger</SimpleButton>
            </div>
            <h1 className="m-2 font-bold text-black">{operationText}</h1>

            <div className="bg-white rounded-md shadow-2xl p-5 mt-10">
                {!joinInfo ? <h1>Velkommen til IT Kartellet vinsmagning. Vælg enten Join eller Opret for at fortsætte.</h1> : joinInfo}
            </div>

          

               </div>


    )

}

export default Index