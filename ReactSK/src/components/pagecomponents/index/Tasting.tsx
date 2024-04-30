import React from 'react'
import { Button, Card, CardBody, CardFooter, CardTitle } from 'reactstrap'

const Tasting = () => {

    const buttonCSS = `bg-blue-500 border-0 hover:bg-blue-700 text-white text-[18px]`;
    return (
<div className='flex flex-row h-full bg-emerald-300 p-4'>
  {/* Sidebar */}
  <div className='w-1/4 mr-3'>
    <Card className=' flex flex-col bg-white mb-2 rounded-[20px] '>
        <CardTitle className=' top'>Adils smagning</CardTitle>
        <CardBody>22-05-2024</CardBody>
        <CardFooter>Vært: Adil Nazir</CardFooter>
    </Card>
    <div className='flex flex-col space-y-3'>
    <Button className={buttonCSS} >Vine i smagning</Button>
    <Button className={buttonCSS} >Deltagere</Button>
    <Button className={buttonCSS} >Vært info</Button>
    <Button className={buttonCSS} >Deltag nu!</Button>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-4">
  <div className="flex flex-wrap items-center space-x-4 space-y-4">
    <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
      <h1>Marqux Wine</h1>
    </div>

    <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
      <h1>Marqux Wine</h1>
    </div>

    <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
      <h1>Marqux Wine</h1>
    </div>

    <div className='bg-gray-500 rounded-[10px] h-32 w-56 text-white flex justify-center items-center'>
      <h1>Marqux Wine</h1>
    </div>
  </div>
</div>

  </div>

    )
}

export default Tasting