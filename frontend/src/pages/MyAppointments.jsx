import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div key={index} className='flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 border-b text-sm text-[#5E5E5E]'>
                        <div className='flex gap-4 sm:gap-6 flex-1'>
                            <img className='w-28 sm:w-36 h-28 sm:h-36 bg-[#EAEFFF] object-cover rounded-lg flex-shrink-0' src={item.docData.image} alt="" />
                            <div className='flex-1 min-w-0'>
                                <p className='text-[#262626] text-base font-semibold truncate'>{item.docData.name}</p>
                                <p className='text-xs sm:text-sm text-gray-500 mt-0.5'>{item.docData.speciality}</p>
                                <p className='text-[#464646] font-medium mt-2 text-xs sm:text-sm'>Address:</p>
                                <p className='text-xs sm:text-sm'>{item.docData.address.line1}</p>
                                <p className='text-xs sm:text-sm'>{item.docData.address.line2}</p>
                                <p className='mt-2 text-xs sm:text-sm'><span className='text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2.5 justify-end text-xs sm:text-sm text-center w-full sm:w-auto pt-2 sm:pt-0'>
                            {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2.5 px-4 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-medium'>Pay Online</button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2.5 px-4 border rounded-lg text-[#696969] bg-[#EAEFFF] font-medium'>Paid</button>}

                            {item.isCompleted && <button className='sm:min-w-48 py-2.5 px-4 border border-green-500 rounded-lg text-green-600 font-medium bg-green-50/50'>Completed</button>}

                            {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2.5 px-4 border rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-medium'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2.5 px-4 border border-red-500 rounded-lg text-red-500 bg-red-50/50 font-medium'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
