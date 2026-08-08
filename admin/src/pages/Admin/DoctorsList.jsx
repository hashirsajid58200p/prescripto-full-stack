import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-3 sm:m-5 flex-1 max-h-[85vh] overflow-y-auto scroll-smooth pr-1 pb-6 w-full max-w-full'>
      <h1 className='text-lg font-medium text-gray-800'>All Doctors</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300 bg-white' key={index}>
            <img className='bg-[#EAEFFF] w-full h-48 object-cover object-top group-hover:bg-primary transition-all duration-300' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-base sm:text-lg font-medium truncate'>{item.name}</p>
              <p className='text-[#5C5C5C] text-xs sm:text-sm mt-0.5'>{item.speciality}</p>
              <div className='mt-3 flex items-center gap-2 text-xs sm:text-sm text-gray-600'>
                <input className='cursor-pointer w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary' onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} id={`doc-avail-${index}`} />
                <label htmlFor={`doc-avail-${index}`} className='cursor-pointer select-none'>Available</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList