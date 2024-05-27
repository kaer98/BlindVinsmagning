import SimpleButton from "./SimpleButton";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";


export default function TopBar() {


  const {authUser}  = useAuthContext();
  const authUserWelcoming = authUser ? <h1>Hej og velkommen {authUser.fullname}</h1> : null

  const {loading, logout} = useLogout();


    return(
        <div>
<div className=' flex   justify-between rounded-3xl bg-slate-600  bg-opacity-50   text-white shadow-xl backdrop-blur-md transition-colors duration-300'>
<img width="100"  className=" rounded-[27px]" height="100" src="https://media.licdn.com/dms/image/C4D0BAQH5rc9zh-M7XQ/company-logo_200_200/0/1630482462395/it_kartellet_logo?e=2147483647&v=beta&t=Pp4qOfZw17xi849gVU1mEE51INsZbC_9isSWErPBL2U" />
<div className="flex justify-center">
  
  <h1 className="mt-7 text-3xl">IT Kartellets Vin Smagning</h1>
  </div>
  
<div className=' items-center flex mr-10'>
{authUserWelcoming}

{authUser && <button onClick={logout} className="block w-full bg-indigo-600  mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Log ud</button>
 }


</div>
</div>

</div>
    )
};

