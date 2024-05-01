import InFormButton from "../../components/buttons/InFormButton";

export default function LoginOrSignupView() {


    return (
        <div className="card  bg-neutral text-neutral-content mt-20">
        <h1 className=" object-center text-white ">Opret en bruger eller log ind.</h1>
    
    <div className="flex justify-center space-x-10 ">

        
        
    <InFormButton url="/signup" onSelect={() => {}}>
        <div className="flex flex-col justify-center">
            <img src="https://www.pngrepo.com/png/14933/180/guest.png" height="50" width="50" className=" ml-[42px] flex items-center"/>
            <h1>Opret ny Bruger</h1>
        </div>
    </InFormButton>

    <InFormButton url="/login" onSelect={() => {}} >
        <div className="flex flex-col justify-center">
            <img src="https://media.licdn.com/dms/image/C4D0BAQH5rc9zh-M7XQ/company-logo_200_200/0/1630482462395/it_kartellet_logo?e=2147483647&v=beta&t=Pp4qOfZw17xi849gVU1mEE51INsZbC_9isSWErPBL2U" height="50" width="50" className=" rounded-[16px] ml-[8px]"/>
            <h1>Log ind</h1>
        </div>
    </InFormButton>
    </div>
    <p className="text-white">For at deltage i smagninger med IT Kartellets Smagnings App, skal du oprette en bruger.</p>
</div>

    )
};