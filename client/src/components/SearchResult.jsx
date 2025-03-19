import React from 'react'
import profile from "../assets/images/profile.jpeg"

const SearchResult = () => {
    return (
        <div className="serProfile">
            <div className="imgProfil">
                <img src={profile}/>
            </div>
            <div className="contentProfil">
                <p className="usNa">rakesh_90</p>
                <p className="usDet">
                    <span>Rakesh Garai</span> <span> • </span> <span>2.1M followers</span>
                </p>
            </div>
        </div>
    )
}

export default SearchResult