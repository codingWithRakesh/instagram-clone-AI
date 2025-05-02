import React from 'react'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { Link } from 'react-router-dom'

const SearchResult = ({value}) => {
    return (
        <Link to={`/${value?.userName}`} className="serProfile">
            <div className="imgProfil">
                <img src={value?.profilePic || userNotPhoto}/>
            </div>
            <div className="contentProfil">
                <p className="usNa">{value?.userName}</p>
                <p className="usDet">
                    <span>{value?.fullName}</span> <span> • </span> <span>{value?.followersCount} followers</span>
                </p>
            </div>
        </Link>
    )
}

export default SearchResult