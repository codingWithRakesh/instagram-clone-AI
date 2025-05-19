import React, { useState } from 'react'
import { useHighLight } from '../contexts/highLightContext'
import TakeHighLightName from './TakeHighLightName'
import TakeHighLightStory from './TakeHighLightStory'

const UploadHighLight = () => {
    const [isHighLight, setIsHighLight] = useHighLight()
    const [sendHighLight, setSendHighLight] = useState({
        name : "",
        storyId : ""
    })
    return (
        isHighLight == "name" ? <TakeHighLightName controls={[sendHighLight, setSendHighLight]} /> : isHighLight == "story" ? <TakeHighLightStory controls={[sendHighLight, setSendHighLight]} /> : ""
    )
}

export default UploadHighLight