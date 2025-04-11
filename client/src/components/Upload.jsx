import React, { useState } from 'react'
import TakePost from './TakePost'
import EditPost from './EditPost'

const Upload = () => {

    const [checktab, setChecktab] = useState("take")

    const [postData, setPostData] = useState({
        file : "",
        content : "",
        taggedUsers : []
    })

    console.log("postData", postData)

    return (
        <>
            {checktab == "take" ? <TakePost setPostData={setPostData} setChecktab={setChecktab} loader={false}/> : checktab == "view" ? <EditPost setChecktab={setChecktab} submitContent={[postData, setPostData]}/> : checktab == "done" ? <TakePost loader={true} setChecktab={setChecktab}/> : ""}
        </>
    )
}

export default Upload