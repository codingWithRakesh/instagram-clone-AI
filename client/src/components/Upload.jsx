import React from 'react'
import TakePost from './TakePost'
import EditPost from './EditPost'

const Upload = () => {

    return (
        <>
            {/* <TakePost loader={false}/> */}
            <EditPost/>
            {/* <TakePost loader={true}/> */}
        </>
    )
}

export default Upload