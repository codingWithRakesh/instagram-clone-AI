import React from 'react'
import ExplorePost from './ExplorePost'

const Explore5Divs = ({ side }) => {
    return (
        <div className="parent">
            {side == "right" ? (
                <>
                    <ExplorePost classNameH="RightDiv1" typeValue="image" />
                    <ExplorePost classNameH="RightDiv3" typeValue="image" />
                    <ExplorePost classNameH="RightDiv4" typeValue="image" />
                    <ExplorePost classNameH="RightDiv5" typeValue="image" />
                    <ExplorePost classNameH="RightDiv2" typeValue="video" />
                </>)
                :
                (<>
                    <ExplorePost classNameH="LeftDiv1" typeValue="image" />
                    <ExplorePost classNameH="LeftDiv2" typeValue="image" />
                    <ExplorePost classNameH="LeftDiv3" typeValue="image" />
                    <ExplorePost classNameH="LeftDiv4" typeValue="image" />
                    <ExplorePost classNameH="LeftDiv5" typeValue="image" />
                </>)
            }
        </div>
    )
}

export default Explore5Divs