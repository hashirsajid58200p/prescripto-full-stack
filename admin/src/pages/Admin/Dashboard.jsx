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
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p></div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className='mr-2'>
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
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard