import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors by specialty.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1.5 px-4 border rounded text-sm transition-all sm:hidden font-medium ${showFilter ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className={`flex-col gap-2.5 text-sm text-gray-600 w-full sm:w-auto ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`pl-3 py-2 pr-12 border border-gray-300 rounded transition-all cursor-pointer font-medium ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black border-primary' : 'bg-white'}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white' key={index}>
              <img className='bg-[#EAEFFF] w-full h-48 object-cover object-top' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-xs text-center font-medium ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-base font-semibold mt-1 truncate'>{item.name}</p>
                <p className='text-[#5C5C5C] text-xs mt-0.5'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors