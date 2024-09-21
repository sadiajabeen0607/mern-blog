// import React from 'react'
import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt="User" className='w-full h-full rounded-full object-cover border-8 border-gray-300' />
        </div>

        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Password' />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>

      <div className='flex justify-between mt-5 text-red-600'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
