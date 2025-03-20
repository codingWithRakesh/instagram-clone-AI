import React from 'react'
import ExplorePost from '../components/ExplorePost'

const Explore = () => {
  return (
    <div className="second Contaner">
      <div className="exploreDiv">
       <ExplorePost typeValue="image" />
       <ExplorePost typeValue="image" />
       <ExplorePost typeValue="image" />
       <ExplorePost typeValue="video" />
       <ExplorePost typeValue="video" />
       <ExplorePost typeValue="video" />
       <ExplorePost typeValue="video" />

      </div>
    </div>
  )
}

export default Explore