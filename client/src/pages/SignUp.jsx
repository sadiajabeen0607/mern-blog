import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-4xl mx-auto gap-5'>
        {/* left */}
        <div className='flex-1'>
        <Link to='/' className='text-4xl font-bold dark:text-white'>
        <span className='px-2.5 py-2 sm:px-2 sm:py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sadia's</span>
        Blog
      </Link>
      <p className='text-sm mt-5'>
        You can sign up with your email and password or with Gmail.
      </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <label htmlFor="">Your username</label>
              <TextInput type='text' id='username' placeholder='Username'  />
            </div>
            <div>
              <label htmlFor="">Your email</label>
              <TextInput type='text' id='email' placeholder='name@example.com'  />
            </div>
            <div>
              <label htmlFor="">Your password</label>
              <TextInput type='password' id='password' placeholder='Password'  />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account?</span>
            <Link to='signin' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
