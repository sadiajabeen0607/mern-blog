import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex flex-1 flex-col justify-center'>
        <h2 className='text-2xl'>
          Want to learn more 
        </h2>
        <p className='text-gray-500 my-2'>
          Checkout there rousourse with 100 Projects
        </p>
        <Button gradientDuoTone='greenToBlue' className='rounded-tl-lg rounded-bl-none rounded-tr-none'>
          <a href="#" target='_blank' rel='noopener noreferrer'>100 Projects</a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src="https://wilsondisease.org/wp-content/uploads/2022/06/copper-conscious-eating-1600x-v2.jpg" alt="" />
      </div>
    </div>
  )
}
