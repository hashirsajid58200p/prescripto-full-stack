import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-3 text-sm pt-5'>

            {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 h-36 rounded-lg opacity-75 object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 h-36 rounded-lg object-cover' src={userData.image} alt="" />
            }

            {isEdit
                ? <input className='bg-gray-50 text-2xl sm:text-3xl font-medium border rounded px-2 py-1 outline-primary w-full max-w-xs' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-2xl sm:text-3xl text-[#262626] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none my-2' />

            <div>
                <p className='text-gray-600 underline font-medium text-xs sm:text-sm'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_2.5fr] sm:grid-cols-[1fr_3fr] gap-y-3 mt-3 text-[#363636] items-center'>
                    <p className='font-medium text-xs sm:text-sm'>Email id:</p>
                    <p className='text-blue-500 text-xs sm:text-sm truncate'>{userData.email}</p>
                    <p className='font-medium text-xs sm:text-sm'>Phone:</p>

                    {isEdit
                        ? <input className='bg-gray-50 border rounded px-2 py-1 text-sm outline-primary w-full max-w-xs' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-500 text-xs sm:text-sm'>{userData.phone}</p>
                    }

                    <p className='font-medium text-xs sm:text-sm'>Address:</p>

                    {isEdit
                        ? <div className='flex flex-col gap-1'>
                            <input className='bg-gray-50 border rounded px-2 py-1 text-sm outline-primary w-full max-w-xs' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <input className='bg-gray-50 border rounded px-2 py-1 text-sm outline-primary w-full max-w-xs' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                        </div>
                        : <p className='text-gray-500 text-xs sm:text-sm'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }

                </div>
            </div>
            <div>
                <p className='text-[#797979] underline font-medium mt-4 text-xs sm:text-sm'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_2.5fr] sm:grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-600 items-center'>
                    <p className='font-medium text-xs sm:text-sm'>Gender:</p>

                    {isEdit
                        ? <select className='max-w-32 bg-gray-50 border rounded px-2 py-1 text-sm outline-primary' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500 text-xs sm:text-sm'>{userData.gender}</p>
                    }

                    <p className='font-medium text-xs sm:text-sm'>Birthday:</p>

                    {isEdit
                        ? <input className='max-w-36 bg-gray-50 border rounded px-2 py-1 text-sm outline-primary' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500 text-xs sm:text-sm'>{userData.dob}</p>
                    }

                </div>
            </div>
            <div className='mt-8'>

                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all text-sm font-medium w-full sm:w-auto'>Save information</button>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all text-sm font-medium w-full sm:w-auto'>Edit Profile</button>
                }

            </div>
        </div>
    ) : null
}

export default MyProfile