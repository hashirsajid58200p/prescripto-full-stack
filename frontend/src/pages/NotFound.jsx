import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-[#F8F9FD] relative overflow-hidden'>
            <div className='flex flex-col items-center justify-center max-w-lg mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100'>
                <h1 className='text-8xl sm:text-9xl font-extrabold text-primary tracking-widest'>404</h1>
                <div className='bg-primary text-white px-4 py-1 text-sm rounded-full font-medium shadow-md -mt-4 mb-6'>
                    Page Not Found
                </div>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mt-2'>Oops! Page Not Found</h2>
                <p className='text-gray-500 mt-3 text-sm sm:text-base leading-relaxed'>
                    The page you are looking for doesn't exist, has been removed, or the link you typed is incorrect.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className='mt-8 bg-primary text-white px-8 py-3 rounded-full text-base font-medium hover:bg-opacity-90 hover:scale-105 transition-all shadow-md'
                >
                    Back to Home Page
                </button>
            </div>
        </div>
    )
}

export default NotFound
