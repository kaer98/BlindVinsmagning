import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store';
import { updateUsername, updateFullname } from '../../store/user/userSlice';

const UserForm = () => {

const dispatch = useDispatch<AppDispatch>();

  return (
<form className='bg-gray-600 h-48 flex flex-col text-white rounded-[20px]'>
    <label htmlFor='username'>Username</label>
    <input type='text' className='text-black' id="username" onChange={(e) => { dispatch(updateUsername(e.target.value))}}/>

    <label htmlFor='username'>Username</label>
    <input type='text' className='text-black' id="username" onChange={(e) => { dispatch(updateFullname(e.target.value))}}/>

    <button className='button drawer-button bg-emerald-400 mt-2 rounded-full hover:bg-emerald-600 transition-all'>Submit</button>
</form>
)
}

export default UserForm