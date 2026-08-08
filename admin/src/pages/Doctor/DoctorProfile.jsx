import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='m-3 sm:m-5 flex-1 max-w-full overflow-x-hidden'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg object-cover' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-5 sm:p-8 py-7 bg-white'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-2xl sm:text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600 text-xs sm:text-sm'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full border rounded outline-primary p-2 text-sm' rows={6} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    <p className='text-gray-600 font-medium text-sm mt-4'>
                        Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' className='border rounded px-2 py-1 outline-primary w-24 text-sm' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className='flex flex-col sm:flex-row sm:gap-2 py-2 text-sm text-gray-600'>
                        <p className='font-medium'>Address:</p>
                        <div className='text-sm mt-1 sm:mt-0'>
                            {isEdit ? (
                                <div className='flex flex-col gap-1'>
                                    <input type='text' className='border rounded px-2 py-1 text-sm outline-primary w-full max-w-xs' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                                    <input type='text' className='border rounded px-2 py-1 text-sm outline-primary w-full max-w-xs' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                                </div>
                            ) : (
                                <p>{profileData.address.line1} <br /> {profileData.address.line2}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center gap-2 pt-2 text-sm text-gray-600'>
                        <input type="checkbox" className='w-4 h-4 cursor-pointer text-primary rounded border-gray-300' id="doc-profile-avail" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="doc-profile-avail" className='cursor-pointer select-none'>Available for appointments</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className='px-6 py-1.5 border border-primary text-sm font-medium rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save Profile</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-6 py-1.5 border border-primary text-sm font-medium rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit Profile</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile