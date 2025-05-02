import React, { useEffect, useState } from 'react'
import ExplorePost from '../components/ExplorePost'
import Explore5Divs from '../components/Explore5Divs'
import { postStore } from '../store/postStore';

const Explore = () => {
  const fetchAllPostSExplore = postStore((state) => state.fetchAllPostSExplore);
  const [exploreValues, setExploreValues] = useState([])
  useEffect(() => {
    fetchAllPostSExplore(setExploreValues)
  }, [])

  // console.log("exploreValues", exploreValues)
  
  return (
    <div className="second Contaner">
      <div className="exploreDiv">

        {
          exploreValues?.map((v, i) => (
            <Explore5Divs side={i%2 === 0 ? "right" : "left"} key={i} values={v}/>
          ))
        }

        {/* <Explore5Divs side="right"/>
        <Explore5Divs side="left"/>
        <Explore5Divs side="right"/> */}

      </div>
    </div>
  )
}

export default Explore