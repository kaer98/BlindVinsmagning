import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import useSignup from '../../hooks/useSignup.ts';
import { Toaster } from 'react-hot-toast';


const SignUp = () => {

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
        
        <div className="bg-white rounded-md shadow-2xl p-5 mt-10">
            <form onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Opret Bruger</h1>

            <p className="text-sm font-normal text-gray-600 mb-8">Opret en bruger for at komme i gang</p>


            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className=" pl-2 w-full bg-white outline-none border-none"  placeholder="Brugernavn"
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}

                />
            </div>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="text" className=" pl-2 w-full bg-white outline-none border-none" placeholder="Fulde Navn"
                    value={inputs.fullname}
                    onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}

                />
            </div>


            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 w-full outline-none bg-white border-none" type="password" name="password" id="password" placeholder="Adgangskode" 
                   value={inputs.password}
                   onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                
                />


            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 w-full outline-none bg-white border-none" type="password" name="password" id="password" placeholder="Bekræft Adgangskoden"
                       value={inputs.confirmPassword}
                       onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                />


            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 w-full outline-none bg-white border-none" placeholder="YYYY-MM-DD"
                       value={inputs.birthday}
                       onChange={(e) => setInputs({ ...inputs, birthday: e.target.value })}
                />


            </div>



            <GenderCheckbox onCheckboxChange={handleGenderCheckbox} selectedGender={inputs.gender} />



            <div>
                        <button className="btn btn-block btn-sm mt-2 hover:bg-gray-700 hover:border-gray-700">
                            Log ind!
                        </button>
                    </div>            <div className="flex justify-between mt-4">

            </div>

            </form>

            <Toaster/>
        </div>)
}

export default SignUp