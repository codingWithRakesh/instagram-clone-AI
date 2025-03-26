import React from 'react'
import EditProfileList from '../components/EditProfileList'
import EditProfileBox from '../components/EditProfileBox'

const EditProfile = () => {
  return (
    <div className="second Contaner relative">
      <div className="navListDiv w-[30%] min-h-screen bg-white border-r border-[#ECF3FF] sticky top-0 left-0">
        <div className="headingTitle text-2xl font-bold">Settings</div>
        <div className="listSetting">
          <p className='text-[#737373] shfhj'>How you use Instagram</p>
          <EditProfileList />
        </div>
      </div>
      <EditProfileBox />
    </div>
  )
}

export default EditProfile