import InFormButton from "../../buttons/InFormButton";

export default function JoinView() {


    return (
        <div>
        <h1 className=" object-center">Deltag som gæst eller log ind med din Google konto.</h1>
    
    <div className="flex justify-center space-x-10 ">

        
        
    <InFormButton url="/signup" onSelect={() => {}}>
        <div className="flex flex-col justify-center">
            <img src="https://www.pngrepo.com/png/14933/180/guest.png" height="50" width="50" className=" ml-8"/>
            <h1>Opret ny Bruger</h1>
        </div>
    </InFormButton>

    <InFormButton url="/join" onSelect={() => {}} >
        <div className="flex flex-col justify-center">
            <img src="https://media.licdn.com/dms/image/C4D0BAQH5rc9zh-M7XQ/company-logo_200_200/0/1630482462395/it_kartellet_logo?e=2147483647&v=beta&t=Pp4qOfZw17xi849gVU1mEE51INsZbC_9isSWErPBL2U" height="50" width="50" className=" rounded-[16px]"/>
            <h1>Log ind</h1>
        </div>
    </InFormButton>
    </div>
    <p>Hvis du ikke logger ind med Google kan du ikke se historik over tidligere smagninger og dine data vil ikke blive gemt.</p>
</div>

    )
};