import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginForm() {

    return (
        <div className="mt-10 card w-96 bg-neutral text-neutral-content">
            <h1 className="text-white font-bold text-2xl mb-1">Log ind</h1>
            <p className="text-sm font-normal text-white mb-8">Vi glæder os! Log ind for at kunne deltage i og oprette smagninger!</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <FaUser />

                <input id="email" className=" pl-2 w-full bg-transparent outline-none border-none" type="email" name="email" placeholder="Brugernavn eller Email Adresse" />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
            <RiLockPasswordFill />
                <input className="pl-2 w-full outline-none bg-transparent border-none" type="password" name="password" id="password" placeholder="Adgangskode" />

            </div>
            <button type="submit" className="block w-full bg-indigo-600  mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Log Ind og se smagninger!</button>
            <div className="flex justify-between mt-4">
      
            </div>

        </div>
    )
};