import React from 'react'
import { Button, Card, CardBody, CardFooter, CardTitle } from 'reactstrap'

interface TastingProps {
    Title: string;
    Date: string;
}
const Tasting = ({ Title, Date }: TastingProps) => {

    const buttonCSS = `bg-blue-500 border-0 hover:bg-blue-700 text-white text-[18px]`;
    return (

        <div className='bg-neutral'>
            <p className='text-white text-[30px]'>{Title}</p>

            <div className='flex flex-row bg-neutral h-full rounded-2xl  shadow-2xl p-5 mt-10 '>
                {/* Sidebar */}

                <div className='w-1/4 mr-3'>


                    {/* Valg i sidebar*/}
                    <div className='flex flex-col gap-2'>
                        <button className="btn btn-active btn-primary hover:bg-blue-800 hover:border-blue-800">Vine i Smagning</button>
                        <button className="btn btn-active btn-primary hover:bg-blue-800 hover:border-blue-800">Deltagere</button>
                        <button className="btn btn-active btn-primary hover:bg-blue-800 hover:border-blue-800">Status</button>
                        <button className="btn btn-active btn-primary hover:bg-blue-800 hover:border-blue-800">Deltag</button>

                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 ">
                    <div className="flex flex-wrap justify-center items-center gap-5">
                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Pakistani Milkwine </h1>
                        </div>

                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Danish Potato Wine</h1>
                        </div>

                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Alkoholfri Vin</h1>
                        </div>

                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Superhalal Vin (0% Alc.)</h1>
                        </div>

                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Simons Vin</h1>
                        </div>

                        <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
                            <h1>Jaspers nightmare wine</h1>
                        </div>




                    </div>
                </div>


            </div>

            <h1>Dato for Smagning: {Date}</h1>
            <h1>Tilmeldte: 23</h1>

        </div>

    )
}

export default Tasting