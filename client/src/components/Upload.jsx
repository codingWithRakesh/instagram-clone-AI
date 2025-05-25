import React, { useState } from 'react'
import TakePost from './TakePost'
import EditPost from './EditPost'
import { useEditPost } from '../contexts/editPostContext'

const Upload = () => {

    const [checktab, setChecktab] = useEditPost()

    return (
        <>
            {checktab.value == "take" ? <TakePost loader="take"/> : checktab.value == "AI" ? <TakePost loader="AI"/> : checktab.value == "view" ? <EditPost /> : checktab.value == "done" ? <TakePost loader="done" /> : ""}
        </>
    )
}

export default Upload