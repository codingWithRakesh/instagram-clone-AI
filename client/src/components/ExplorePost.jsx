import React from 'react'
import image from "../assets/images/profile.jpeg"
import video from "../assets/videos/videoMin.mp4"
import { Link, useLocation } from 'react-router-dom'
import friends from "../assets/images/friends.jpeg"
import mem from "../assets/images/mem.jpg"

const ExplorePost = ({ typeValue, classNameH, valuesData }) => {
  // console.log("valuesData", valuesData?._id)
  const location = useLocation();
  return (
    <>
      {typeValue == "image" ? (<Link to={`${location.pathname === "/" ? "" : location.pathname}/p/${valuesData?._id}`} className={`explorePost ${classNameH}`}>
        <img src={valuesData?.image} />
        <div className="exploreLike">
          <div><i className="fa-solid fa-heart"></i> {valuesData?.likeCount}</div>
          <div><i className="fa-solid fa-comment fa-flip-horizontal"></i> {valuesData?.commentCount}</div>
        </div>
      </Link>)
        :
        (<Link to={`${location.pathname === "/" ? "" : location.pathname}/p/${valuesData?._id}`} className={`explorePost ${classNameH}`}>
          <div className="showSvg">
            <svg aria-label="Reel" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reel</title><path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z" fill-rule="evenodd"></path></svg>
          </div>
          <video autoplay muted loop>
            <source src={valuesData?.video} type="" />
          </video>
          <div className="exploreLike">
            <div><i className="fa-solid fa-heart"></i> {valuesData?.likeCount}</div>
            <div><i className="fa-solid fa-comment fa-flip-horizontal"></i> {valuesData?.commentCount}</div>
          </div>
        </Link>)}
    </>
  )
}

export default ExplorePost