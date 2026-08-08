import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, completeAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-auto scroll-smooth'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_1fr] grid-flow-col py-3 px-6 border-b font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Payment Status</p>
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
                <div className='text-right'>
                  <p className='text-xs text-gray-500'>Doctor</p>
                  <p className='text-xs font-medium text-gray-700'>{item.docData.name}</p>
                </div>
              </div>
              <div className='flex items-center justify-between pt-1 border-t border-gray-100 text-xs'>
                <span className='font-semibold text-gray-800'>Fees: {currency}{item.amount}</span>
                <div className='flex items-center gap-2'>
                  {item.cancelled ? (
                    <span className='px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='px-2.5 py-0.5 rounded-full bg-green-100 text-green-600 font-medium'>Completed</span>
                  ) : item.payment ? (
                    <span className='px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium'>Paid</span>
                  ) : (
                    <span className='px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium'>Unpaid</span>
                  )}
                  {item.cancelled || item.isCompleted ? null : item.payment ? (
                    <div className='flex items-center gap-1 ml-1'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-7 h-7 cursor-pointer' src={assets.cancel_icon} alt="Cancel" title="Cancel" />
                      <img onClick={() => completeAppointment(item._id)} className='w-7 h-7 cursor-pointer' src={assets.tick_icon} alt="Confirm" title="Confirm" />
                    </div>
                  ) : (
                    <img onClick={() => cancelAppointment(item._id)} className='w-7 h-7 cursor-pointer ml-1' src={assets.cancel_icon} alt="Cancel" title="Cancel" />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop View Table Row (sm and above) */}
            <div className='hidden sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 h-8 rounded-full object-cover' alt="" /> <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image} className='w-8 h-8 rounded-full bg-gray-200 object-cover' alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              <div>
                {item.cancelled ? (
                  <span className='px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium inline-block text-center'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium inline-block text-center'>Completed</span>
                ) : item.payment ? (
                  <span className='px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium inline-block text-center'>Paid</span>
                ) : (
                  <span className='px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium inline-block text-center'>Unpaid</span>
                )}
              </div>
              <div>
                {item.cancelled || item.isCompleted ? (
                  <p className='text-gray-400 text-xs font-medium text-center'>-</p>
                ) : item.payment ? (
                  <div className='flex items-center gap-1'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.tick_icon} alt="Confirm" title="Confirm/Complete Appointment" />
                  </div>
                ) : (
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:scale-110 transition-all' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments