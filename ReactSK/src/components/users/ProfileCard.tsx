import { RootState } from '../../store/';
import React from 'react'
import { useSelector } from 'react-redux'

export const ProfileCard = () => {
  
    const userSlice = useSelector((state: RootState ) => state.user);
    return (
    <div>

       <h1 className='text-white'> {userSlice.username} </h1>
       <h1 className='text-white'> {userSlice.fullname} </h1>


    </div>
  )
}
