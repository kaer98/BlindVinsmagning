import React from 'react'

const UserForm = () => {
  return (
<form className='bg-gray-600 h-48 flex flex-col text-white rounded-[20px]'>
    <label htmlFor='username'>Username</label>
    <input type='text' id="username"/>

    <label htmlFor='username'>Username</label>
    <input type='text' id="username"/>

    <button className='button drawer-button bg-emerald-400 mt-2 rounded-full hover:bg-emerald-600 transition-all'>Submit</button>
</form>
)
}

export default UserForm