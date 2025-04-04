import React, { useState } from 'react'
import profile from "../assets/images/profile.jpeg"
import axios from 'axios'
import { handleError, handleSuccess } from './ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import noProfile from "../assets/images/profileNot.jpg"
// import { setuser } from '../redux/authSlice.js'
import { useAuthStore } from '../store/authStore.js'

const EditProfileBox = () => {

    const user = useAuthStore((state) => state.user);
    const dispatch = useDispatch()

    const [updateProfile, setUpdateProfile] = useState({
        gender: user?.gender || "",
        bio: user?.bio || "",
        websiteURL: user?.websiteURL || "",
        phoneNumber: user?.phoneNumber || ""
    })

    console.log("user from edit profile", user)

    // const [file, setFile] = useState("")
    const [imageSrc, setImageSrc] = useState("")

    const handleChange = (e) => {
        // const { name, value } = e.target
        // setUpdateProfile((prev) => ({
        //     ...prev, [name]: value
        // }))
    }

    const fileChange = async (e) => {
        // const selectedFile = e.target.files[0];
        // if (selectedFile) {
        //     const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        //     if (!validImageTypes.includes(selectedFile.type)) {
        //         handleError("only image allow")
        //         e.target.value = "";
        //         return;
        //     }

        //     const maxSizeInBytes = 4 * 1024 * 1024;
        //     if (selectedFile.size > maxSizeInBytes) {
        //         handleError("Image size must be less than 4 MB.")
        //         e.target.value = "";
        //         return;
        //     }

        //     const formData = new FormData();
        //     formData.append('profileImg', selectedFile);

        //     try {
        //         const response = await axios.patch(
        //             `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/updateProfileImage`,
        //             formData,
        //             {
        //                 withCredentials: true,
        //             }
        //         );
    
        //         // dispatch(setuser(response.data.data));
        //         console.log("response.data", response.data.data)
        //         handleSuccess(response.data.message);
        //         setImageSrc(URL.createObjectURL(selectedFile));
        //     } catch (error) {
        //         console.error('Error:', error.response?.data?.message || error.message);
        //         handleError(error.response?.data?.message || error.message);
        //     }
        // }
    }

    const editProfile = async (e) => {
        e.preventDefault()
        // try {
        //     const response = await axios.patch(
        //         `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/updateProfile`,
        //         updateProfile,
        //         {
        //             withCredentials: true,
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         }
        //     );

        //     dispatch(setuser(response.data.data));
        //     console.log("response.data", response.data.data)
        //     handleSuccess(response.data.message);
        // } catch (error) {
        //     console.error('Error:', error.response?.data?.message || error.message);
        //     handleError(error.response?.data?.message || error.message);
        // }
        // console.log(updateProfile)
    }

    return (
        <div className="navListDivEdit w-[70%] min-h-screen bg-white absolute right-0 top-0">
            <div className="headingTitleEdit text-2xl font-bold">
                Edit profile
            </div>

            <div className="profileSecEdit bg-[#EFEFEF] flex items-center justify-between w-full h-[5.5rem] rounded-2xl">
                <div className="profileEdit flex items-center gap-3.5">
                    <div className='w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden'>
                        <img src={imageSrc ? imageSrc : (user?.profilePic ? user.profilePic : noProfile)} alt="" className='h-full w-full object-cover' />
                    </div>
                    <div className='leading-tight'>
                        <p className='font-bold text-[18px]'>{user?.userName}</p>
                        <p className='text-[#737373] text-[14px]'>{user?.fullName}</p>
                    </div>
                </div>
                <div className="selectImageBox h-[2rem] w-[8rem] bg-[#0095F6] text-white font-bold text-[14px] flex items-center justify-center rounded-[10px] cursor-pointer">
                    <input onChange={fileChange} type="file" id='uploadImg' hidden />
                    <label htmlFor="uploadImg" className='cursor-pointer'>Change photo</label>
                </div>
            </div>

            <form onSubmit={editProfile}>
                <div className="websitesjdh sjfhkjfh w-full h-[6rem]">
                    <div className="nameTitleWeb font-bold text-[1.2rem]">Website</div>
                    <input name='websiteURL' value={updateProfile.websiteURL} onChange={handleChange} type="text" className='border border-[#dbdbdb] w-full h-[2.625rem] outline-none rounded-[10px]' />
                </div>

                <div className="websitesjdh w-full h-[8rem]">
                    <div className="nameTitleWeb font-bold text-[1.2rem]">Bio</div>
                    <textarea name='bio' value={updateProfile.bio} onChange={handleChange} type="text" className='border border-[#dbdbdb] w-full h-[4.5rem] outline-none rounded-[10px] resize-none' ></textarea>
                </div>

                <div className="websitesjdh w-full h-[6rem]">
                    <div className="nameTitleWeb font-bold text-[1.2rem]">Mobile Number</div>
                    <input type="text" name='phoneNumber' value={updateProfile.phoneNumber} onChange={handleChange} className='border border-[#dbdbdb] w-full h-[2.625rem] outline-none rounded-[10px]' />
                </div>

                <div className="websitesjdh w-full h-[6rem]">
                    <div className="nameTitleWeb font-bold text-[1.2rem]">Gender</div>
                    <select name='gender' value={updateProfile.gender} onChange={handleChange} type="text" className='border border-[#dbdbdb] w-full h-[3.375rem] outline-none rounded-[10px]' >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">FeMale</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="websitesjdh forButtonEdit w-full h-[6rem] flex items-center justify-end">
                    <button type="submit" className='w-[15.813rem] cursor-pointer text-white rounded-[10px] h-[2.75rem] bg-[#0095f6] hover:bg-[#0062f6]'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default EditProfileBox