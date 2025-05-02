import React from 'react'
import ExplorePost from './ExplorePost'

const Explore5Divs = ({ side, values }) => {
    // console.log("inThe Explore5Divs", side, values)

    const [first, second, third, fourth, fifth] = values
    // console.log("values", first, second, third, fourth, fifth)
    return (
        <>
            {side === "right" ? <div className="parent">
                <div className='someMore'>
                    <ExplorePost classNameH="singleExplore" valuesData={first} typeValue={first?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={second} typeValue={second?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={third} typeValue={third?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={fourth} typeValue={fourth?.image ? "image" : "video"} />
                </div>
                <div className='bigOne'>
                    <ExplorePost classNameH="insideBig" valuesData={fifth} typeValue={fifth?.image ? "image" : "video"} />
                </div>
            </div>
                :
            <div className="parent gap5PX">
                <div className='bigOne'>
                    <ExplorePost classNameH="insideBig" valuesData={fifth} typeValue={fifth?.image ? "image" : "video"} />
                </div>
                <div className='someMore'>
                    <ExplorePost classNameH="singleExplore" valuesData={first} typeValue={first?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={second} typeValue={second?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={third} typeValue={third?.image ? "image" : "video"} />
                    <ExplorePost classNameH="singleExplore" valuesData={fourth} typeValue={fourth?.image ? "image" : "video"} />
                </div>
            </div>}
        </>
    )
}

export default Explore5Divs