import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 relative'>
            <h1 className='text-8xl md:text-9xl font-extrabold text-primary tracking-widest'>404</h1>
            <div className='bg-primary text-white px-4 py-1 text-sm rounded rotate-12 absolute mb-16 font-medium shadow-md'>
                Page Not Found
            </div>
            <p className='text-2xl md:text-3xl font-semibold text-gray-800 mt-8'>Oops! Looks like you're lost.</p>
            <p className='text-gray-500 mt-2 max-w-md text-sm md:text-base'>
                The page you are looking for doesn't exist, has been removed, or the link you typed is incorrect.
            </p>
            <button 
                onClick={() => navigate('/')} 
                className='mt-8 bg-primary text-white px-8 py-3 rounded-full text-base font-light hover:bg-opacity-90 hover:scale-105 transition-all shadow-md'
            >
                Back to Home Page
            </button>
        </div>
    )
}

export default NotFound
