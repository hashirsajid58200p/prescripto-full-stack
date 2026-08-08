import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const handleLogoClick = () => {
    if (aToken) {
      if (window.location.pathname.includes('/admin-dashboard')) {
        window.location.href = '/'
      } else {
        navigate('/admin-dashboard')
      }
    } else if (dToken) {
      if (window.location.pathname.includes('/doctor-dashboard')) {
        window.location.href = '/'
      } else {
        navigate('/doctor-dashboard')
      }
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className='flex justify-between items-center px-3 sm:px-10 py-3 border-b bg-white sticky top-0 z-30'>
      <div className='flex items-center gap-2 sm:gap-3 text-xs'>
        <button
          onClick={() => setIsMenuOpen(prev => !prev)}
          className='md:hidden p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all'
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <img onClick={handleLogoClick} className='w-28 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600 text-[10px] sm:text-xs font-medium'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={() => logout()} className='bg-primary text-white text-xs sm:text-sm px-4 sm:px-10 py-1.5 sm:py-2 rounded-full font-medium transition-all hover:bg-primary/90'>Logout</button>
    </div>
  )
}

export default Navbar