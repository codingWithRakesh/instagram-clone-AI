import React, { useState } from 'react'
import TakePost from './TakePost'
import EditPost from './EditPost'
import { useEditPost } from '../contexts/editPostContext'

const Upload = () => {

    const [checktab, setChecktab] = useEditPost()

    return (
        <>
            {checktab.value == "take" ? <TakePost loader={false}/> : checktab.value == "view" ? <EditPost /> : checktab.value == "done" ? <TakePost loader={true} /> : ""}
        </>
    )
}

export default Upload