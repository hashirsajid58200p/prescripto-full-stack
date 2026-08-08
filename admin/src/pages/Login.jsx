import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='flex flex-col gap-3 w-full max-w-md items-start p-6 sm:p-8 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold m-auto text-gray-800'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full mt-2'>
          <p className='text-xs sm:text-sm font-medium'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2.5 mt-1 outline-primary text-sm' type="email" required />
        </div>
        <div className='w-full'>
          <p className='text-xs sm:text-sm font-medium'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2.5 mt-1 outline-primary text-sm' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2.5 my-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all'>Login</button>
        {
          state === 'Admin'
            ? <p className='text-xs sm:text-sm text-gray-600'>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer font-medium'>Click here</span></p>
            : <p className='text-xs sm:text-sm text-gray-600'>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer font-medium'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login