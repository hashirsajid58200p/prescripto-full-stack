import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const handleLinkClick = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className='fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-xs transition-opacity'
        />
      )}

      {/* Sidebar Container (Desktop Sidebar + Mobile Drawer) */}
      <div className={`
        bg-white border-r min-h-screen z-40 transition-all duration-300
        md:static md:translate-x-0 md:w-auto
        fixed top-0 bottom-0 left-0 w-64 shadow-2xl md:shadow-none
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {aToken && (
          <ul className='text-[#515151] mt-5'>
            <NavLink onClick={handleLinkClick} to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.home_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Dashboard</p>
            </NavLink>
            <NavLink onClick={handleLinkClick} to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.appointment_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Appointments</p>
            </NavLink>
            <NavLink onClick={handleLinkClick} to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.add_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Add Doctor</p>
            </NavLink>
            <NavLink onClick={handleLinkClick} to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.people_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Doctors List</p>
            </NavLink>
          </ul>
        )}

        {dToken && (
          <ul className='text-[#515151] mt-5'>
            <NavLink onClick={handleLinkClick} to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.home_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Dashboard</p>
            </NavLink>
            <NavLink onClick={handleLinkClick} to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.appointment_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Appointments</p>
            </NavLink>
            <NavLink onClick={handleLinkClick} to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
              <img className='min-w-5 w-5' src={assets.people_icon} alt='' />
              <p className='block font-medium text-sm md:text-base'>Profile</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  )
}

export default Sidebar