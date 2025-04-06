import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { Link, useLocation, useParams } from 'react-router-dom'

const SinglePost = ({values}) => {
    // console.log("values from savePost",values)
    const location = useLocation();
    // console.log(location)
    return (
        <Link to={`${location.pathname === "/" ? "" : location.pathname}/p/${values?._id}`} className="imagesPro">
            <img src={values?.image || profile} alt="" />
            <div className="imagesPro_0">
                <div className="lijdjcs"><i className="fa-solid fa-heart"></i> {values?.likeCount}</div>
                <div className="lijdjcs"><i className="fa-solid fa-comment fa-flip-horizontal"></i> {values?.commentCount}</div>
            </div>
        </Link>
    )
}

export default SinglePost