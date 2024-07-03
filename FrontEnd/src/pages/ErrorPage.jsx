import React from 'react'
import { TbFaceIdError } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='text-9xl mt-10 text-gray-500'>
        <TbFaceIdError />
      </div>
      <div className='flex justify-center items-center mt-8'>
        <h2 className='text-6xl font-semibold text-gray-500'>404</h2>
      </div>
      <div className='flex justify-center items-center mt-8'> 
        <p className='text-2xl font-semibold text-gray-500'>Page not found</p>
      </div>
      <div className='flex flex-col justify-center items-center mt-8 max-w-[60%]'> 
        <p className='text-lg font-semibold text-gray-500 '>The page you are looking for does not exist or an other issue occurred. </p>
        <p className='text-lg font-semibold text-gray-500'>Go back, or head over to main page to chhose a new direction.</p>
      </div>
    </div>
  )
}

export default ErrorPage
