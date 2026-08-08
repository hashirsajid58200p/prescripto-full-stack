import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, completeAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-3 sm:m-5 flex-1 w-full max-w-full overflow-x-hidden'>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full'>
        <div className='flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-xs hover:scale-102 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 text-sm'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-xs hover:scale-102 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400 text-sm'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-xs hover:scale-102 transition-all sm:col-span-2 lg:col-span-1'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400 text-sm'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg border mt-8 overflow-hidden'>
        <div className='flex items-center gap-2.5 px-4 py-4 border-b bg-gray-50/50'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-3.5 gap-3 hover:bg-gray-50 transition-colors' key={index}>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <img className='rounded-full w-10 h-10 object-cover flex-shrink-0' src={item.docData.image} alt="" />
                <div className='text-sm min-w-0 flex-1'>
                  <p className='text-gray-800 font-medium truncate'>{item.docData.name}</p>
                  <p className='text-gray-500 text-xs mt-0.5'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              <div className='flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100'>
                <div>
                  {item.cancelled ? (
                    <span className='px-2.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600 font-medium'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='px-2.5 py-0.5 text-xs rounded-full bg-green-100 text-green-600 font-medium'>Completed</span>
                  ) : item.payment ? (
                    <span className='px-2.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 font-medium'>Paid</span>
                  ) : (
                    <span className='px-2.5 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium'>Unpaid</span>
                  )}
                </div>

                {item.cancelled || item.isCompleted ? (
                  <p className='text-gray-400 text-xs font-medium text-center min-w-8'>-</p>
                ) : item.payment ? (
                  <div className='flex items-center gap-1.5'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-8 h-8 cursor-pointer hover:scale-110 transition-all p-1' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                    <img onClick={() => completeAppointment(item._id)} className='w-8 h-8 cursor-pointer hover:scale-110 transition-all p-1' src={assets.tick_icon} alt="Confirm" title="Confirm/Complete Appointment" />
                  </div>
                ) : (
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 h-8 cursor-pointer hover:scale-110 transition-all p-1' src={assets.cancel_icon} alt="Cancel" title="Cancel Appointment" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard