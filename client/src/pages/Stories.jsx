import React from 'react'
import {stories} from "../constants/constant.js"
import Stories from 'react-insta-stories';

const StoriesAll = () => {
  return (
    <Stories
    stories={stories}
    defaultInterval={5000}
    width={350}
    height={600}
    loop={true}
    keyboardNavigation={true}
    onAllStoriesEnd={() => console.log('All stories finished')}
    onStoryEnd={(index) => console.log(`Story ${index + 1} finished`)}
  />
  )
}

export default StoriesAll