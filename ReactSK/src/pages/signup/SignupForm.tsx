import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox.tsx'
import useSignup from '../../hooks/useSignup.ts';
import { Toaster } from 'react-hot-toast';
import { FaUser, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";


const SignupForm = () => {

    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        birthday: ''

    });


    const { loading, signup } = useSignup();

    const handleGenderCheckbox = (gender: any) => {
        setInputs({ ...inputs, gender });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (

        <div className=" mt-10 card w-96 bg-neutral text-neutral-content  ">
            <form onSubmit={handleSubmit}>
                <h1 className="text-white font-bold text-2xl mb-1">Opret Bruger</h1>

                <p className="text-sm font-normal text-white mb-8">Opret en bruger for at komme i gang</p>

                <p>Brugernavn</p>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">

                    <FaUser />
                    <input className=" pl-2 w-full bg-transparent outline-none border-none" placeholder="Brugernavn"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}

                    />
                </div>

                <p>Dit Fulde Navn</p>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
                    <FaUserCircle />
                    <input id="text" className=" pl-2 w-full bg-transparent outline-none border-none" placeholder="Fulde Navn"
                        value={inputs.fullname}
                        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}

                    />
                </div>

            <p>Adgangskode (Mindst 6 tegn)</p>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                    <RiLockPasswordLine />
                    <input className="pl-2 w-full outline-none bg-transparent border-none" type="password" name="password" id="password" placeholder="Adgangskode"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}

                    />


                </div>

                <p>Indtast din Adgangskode igen</p>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                    <RiLockPasswordFill />
                    <input className="pl-2 w-full outline-none bg-transparent border-none" type="password" name="password" id="password" placeholder="Bekræft Adgangskoden"
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                    />


                </div>

                <p>Fødselsdato (YYYY-MM-DD)</p>

                <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ">
                    <BsCalendarDateFill />
                    <input className="pl-2 w-full outline-none bg-transparent border-none" placeholder="YYYY-MM-DD"
                        value={inputs.birthday}
                        onChange={(e) => setInputs({ ...inputs, birthday: e.target.value })}
                    />


                </div>

                <p>Køn</p>

                <div>
                    <GenderCheckbox onCheckboxChange={handleGenderCheckbox} selectedGender={inputs.gender} />

                    <button type="submit" className="block w-full bg-indigo-600  mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Opret Bruger</button>


                </div>







            </form>

            <Toaster />
        </div>)
}

export default SignupForm