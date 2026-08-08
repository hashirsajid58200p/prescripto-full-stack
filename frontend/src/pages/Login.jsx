import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/my-appointments')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='flex flex-col gap-3 w-full max-w-md items-start p-6 sm:p-8 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold text-gray-800'>Login</p>
        <p className='text-gray-500 text-xs sm:text-sm'>Please log in to book appointment</p>
        <div className='w-full mt-2'>
          <p className='text-xs sm:text-sm font-medium'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2.5 mt-1 outline-primary text-sm' type="email" required />
        </div>
        <div className='w-full'>
          <p className='text-xs sm:text-sm font-medium'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2.5 mt-1 outline-primary text-sm' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2.5 my-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all'>Login</button>
        <p className='text-xs sm:text-sm text-gray-600'>Create a new account? <span onClick={() => navigate('/signup')} className='text-primary underline cursor-pointer font-medium'>Click here</span></p>
      </div>
    </form>
  )
}

export default Login