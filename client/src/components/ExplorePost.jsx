import React from 'react'
import image from "../assets/images/profile.jpeg"
import video from "../assets/videos/videoMin.mp4"

const ExplorePost = ({typeValue}) => {
    return (
        <>
        {typeValue == "image" ? (<div className="explorePost">
            <img src={image}/>
                <div className="exploreLike">
                    <div><i className="fa-solid fa-heart"></i> 6,101</div>
                    <div><i className="fa-solid fa-comment fa-flip-horizontal"></i> 389</div>
                </div>
        </div>)
        :
        (<div className="explorePost">
          <video autoplay muted loop>
            <source src={video} type=""/>
          </video>
          <div className="exploreLike">
            <div><i className="fa-solid fa-heart"></i> 6,101</div>
            <div><i className="fa-solid fa-comment fa-flip-horizontal"></i> 389</div>
          </div>
        </div>)}
        </>
    )
}

export default ExplorePost