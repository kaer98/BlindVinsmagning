import SimpleButton from "./SimpleButton";


export default function TopBar() {

    return(
        <div>
<div className=' flex  justify-between rounded-3xl bg-slate-600  bg-opacity-50 px-10  text-white shadow-xl backdrop-blur-md transition-colors duration-300'>
<img width="100"  className=" rounded-[27px]" height="100" src="https://media.licdn.com/dms/image/C4D0BAQH5rc9zh-M7XQ/company-logo_200_200/0/1630482462395/it_kartellet_logo?e=2147483647&v=beta&t=Pp4qOfZw17xi849gVU1mEE51INsZbC_9isSWErPBL2U" />
<div className="flex justify-center">
  <h1 className="mt-7 text-3xl">IT Kartellets Vin Smagning</h1>
  </div>
<div className=''>
<SimpleButton onSelect={() => {}} className="" divClass="mt-2">Log ind</SimpleButton>

</div>

  
  
</div>

</div>
    )
};

