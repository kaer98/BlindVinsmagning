import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useLogin } from '../../hooks/useLogin'
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const { loading, login } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await login(inputs);


        setTimeout(() => {
            navigate("/");

        }, 1000);
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

                <p>Adgangskode</p>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                    <RiLockPasswordFill />
                    <input className="pl-2 w-full outline-none bg-transparent border-none" type="password" name="password" id="password" placeholder="Adgangskode"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}

                    />


                </div>

                <button type="submit" className="block w-full bg-indigo-600  mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Log Ind</button>

            </form>

            <Toaster />
        </div>)
};