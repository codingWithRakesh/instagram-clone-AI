import React from 'react'
import Story from './Story'

const AllStory = () => {
  return (
    <div className="statusDiv">
      <div className="slider-wrapper">
        <button id="prev-slide" className="slide-button material-symbols-rounded">
          chevron_left
        </button>
        <ul className="image-list">
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />

        </ul>
        <button id="next-slide" className="slide-button material-symbols-rounded">
          chevron_right
        </button>
      </div>
    </div>
  )
}

export default AllStory