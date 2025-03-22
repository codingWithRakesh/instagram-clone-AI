import React from 'react'
import ExplorePost from '../components/ExplorePost'
import Explore5Divs from '../components/Explore5Divs'

const Explore = () => {
  return (
    <div className="second Contaner">
      <div className="exploreDiv">

        <Explore5Divs side="right"/>
        <Explore5Divs side="left"/>
        <Explore5Divs side="right"/>

      </div>
    </div>
  )
}

export default Explore