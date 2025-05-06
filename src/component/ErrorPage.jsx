import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <h1 className='text-[25px] font-bold uppercase mb-5'>Something went wrong in the application.</h1>
      <Link to={"/"}>
        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">Go Home</button> 
      </Link>
    </div>
  )
}

export default ErrorPage
