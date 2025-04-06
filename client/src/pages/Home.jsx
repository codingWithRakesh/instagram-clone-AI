import React, { useEffect, useState } from 'react'
import profile from "../assets/images/profile.jpeg"
import AllStory from '../components/AllStory'
import AllPosts from '../components/AllPosts'
import AllSuggaFollower from '../components/AllSuggaFollower'
import { useSwitch } from '../contexts/switchContext'
import { useSelector } from 'react-redux'
import { FaRegCircleUser, FaRegUser } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import userNotPhoto from "../assets/images/profileNot.jpg"
import axios from 'axios'
import { handleError } from '../components/ErrorMessage'

const Home = () => {
  const [, setIsSwitch] = useSwitch()
  const [user, setUser] = useState("")
  const fetchAuth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/currentUser`,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.data)
      // handleSuccess("user fetch Successfully");
      // console.log('User Data APP:', response.data.data, response.data.message);
    } catch (error) {
      // console.error('Error:', error.response?.data?.message || error.message);
      handleError(error.response?.data?.message || error.message);
    }
  }
  useEffect(() => {
    fetchAuth()
  }, []);
  return (
    <div className="second Contaner">
      <div className="box content">
        <AllStory />
        <AllPosts />
      </div>

      {/* current user */}
      <div className="box profilCon">
        <div className="profileBtn">
          <NavLink to={`/${user.userName}`} className="flex gap-2">
            <div className="proimg">
              {user.profilePic ? <img src={user.profilePic} alt="" />
                :
                <img src={userNotPhoto} alt="" />}
            </div>
            <div className="userName">
              <p className="bold">{user.userName}</p>
              <p className="nameUs">{user.fullName}</p>
            </div>
          </NavLink>
          <div className="switchBtn cursor-pointer" onClick={() => setIsSwitch((v) => !v)}>Switch</div>
        </div>

        <div className="suggasonBtn">
          <p className="bold nameUs">Suggested for you</p>
          <p className="bold a">See All</p>
        </div>

        <AllSuggaFollower />

        <div className="write">
          <p className="wriNote">
            <span>About . </span> <span>Help . </span> <span> Press . </span> <span> API . </span>
            <span> Jobs . </span> <span> Privacy . </span> <span> Terms . </span> <span> Locations . </span>
            <span> Language . </span> <span> Meta Verified </span>
          </p>
          <p className="copyright">© 2025 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  )
}

export default Home