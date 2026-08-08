import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <React.Fragment key={index}>
            {/* Mobile View Card (below sm) */}
            <div className='flex flex-col gap-2.5 p-4 sm:hidden border-b hover:bg-gray-50/50'>
              <div className='flex items-center justify-between text-xs text-gray-500 pb-1 border-b border-gray-100'>
                <span className='font-semibold text-gray-700'>#{index + 1}</span>
                <span>{slotDateFormat(item.slotDate)}, {item.slotTime}</span>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-8 h-8 rounded-full object-cover' alt="" />
                  <div>
                    <p className='text-gray-800 font-medium text-xs'>{item.userData.name}</p>
                    <p className='text-gray-400 text-[11px]'>Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>
                <span className='text-xs font-medium border border-primary px-2 py-0.5 rounded-full text-primary'>
                  {item.payment ? 'Online' : 'CASH'}
                </span>
              </div>
              <div className='flex items-center justify-between pt-1 border-t border-gray-100 text-xs'>
                <span className='font-semibold text-gray-800'>Fees: {currency}{item.amount}</span>
                <div>
                  {item.cancelled ? (
                    <span className='px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='px-2.5 py-0.5 rounded-full bg-green-100 text-green-600 font-medium'>Completed</span>
                  ) : (
                    <div className='flex items-center gap-1.5'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-7 h-7 cursor-pointer' src={assets.cancel_icon} alt="Cancel" title="Cancel" />
                      <img onClick={() => completeAppointment(item._id)} className='w-7 h-7 cursor-pointer' src={assets.tick_icon} alt="Confirm" title="Confirm" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop View Table Row (sm and above) */}
            <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 h-8 rounded-full object-cover' alt="" /> <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 py-0.5 rounded-full text-primary font-medium'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {item.cancelled ? (
                <span className='px-2.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600 font-medium inline-block text-center w-max'>Cancelled</span>
              ) : item.isCompleted ? (
                <span className='px-2.5 py-0.5 text-xs rounded-full bg-green-100 text-green-600 font-medium inline-block text-center w-max'>Completed</span>
              ) : (
                <div className='flex items-center gap-1'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.cancel_icon} alt="Cancel" title="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.tick_icon} alt="Confirm" title="Confirm" />
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments