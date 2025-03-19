import React from 'react'
import profile from "../assets/images/profile.jpeg"
import AllStory from '../components/AllStory'
import AllPosts from '../components/AllPosts'
import AllSuggaFollower from '../components/AllSuggaFollower'

const Home = () => {
  return (
    <div className="second Contaner">
      <div className="box content">
        <AllStory/>
        <AllPosts/>
      </div>

      {/* current user */}
      <div className="box profilCon">
        <div className="profileBtn">
          <div className="proimg">
            <img src={profile} alt="" />
          </div>
          <div className="userName">
            <p className="bold">tarapada_9679</p>
            <p className="nameUs">Tarapada Garai</p>
          </div>
          <div className="switchBtn">Switch</div>
        </div>

        <div className="suggasonBtn">
          <p className="bold nameUs">Suggested for you</p>
          <p className="bold a">See All</p>
        </div>
        
        <AllSuggaFollower/>

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