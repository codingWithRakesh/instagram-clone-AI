import React, { useState } from 'react'
import TakePost from './TakePost'
import EditPost from './EditPost'
import { useEditPost } from '../contexts/editPostContext'
import { usePostData } from '../contexts/postDataContext'

const Upload = () => {

    const [checktab, setChecktab] = useEditPost()

    const [postData, setPostData] = usePostData()

    console.log("postData", postData)

    return (
        <>
            {checktab.value == "take" ? <TakePost loader={false}/> : checktab.value == "view" ? <EditPost /> : checktab.value == "done" ? <TakePost loader={true} /> : ""}
        </>
    )
}

export default Upload