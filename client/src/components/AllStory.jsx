import React from 'react'
import Story from './Story'

const AllStory = () => {
  const storyArray = [
    { id: 1, name: "Story 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Story 2", image: "path/to/image2.jpg" },
    { id: 3, name: "Story 3", image: "path/to/image3.jpg" },
    { id: 4, name: "Story 4", image: "path/to/image4.jpg" },
    { id: 5, name: "Story 5", image: "path/to/image5.jpg" },
    { id: 6, name: "Story 6", image: "path/to/image6.jpg" },
    { id: 7, name: "Story 7", image: "path/to/image7.jpg" },
    { id: 8, name: "Story 8", image: "path/to/image8.jpg" },
    { id: 9, name: "Story 9", image: "path/to/image9.jpg" },
    { id: 10, name: "Story 10", image: "path/to/image10.jpg" },
    { id: 1, name: "Story 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Story 2", image: "path/to/image2.jpg" },
    { id: 3, name: "Story 3", image: "path/to/image3.jpg" },
    { id: 4, name: "Story 4", image: "path/to/image4.jpg" },
    { id: 5, name: "Story 5", image: "path/to/image5.jpg" },
    { id: 6, name: "Story 6", image: "path/to/image6.jpg" },
    { id: 7, name: "Story 7", image: "path/to/image7.jpg" },
    { id: 8, name: "Story 8", image: "path/to/image8.jpg" },
    { id: 9, name: "Story 9", image: "path/to/image9.jpg" },
    { id: 10, name: "Story 10", image: "path/to/image10.jpg" },
  ]

  // console.log('Story Array:', storyArray.length);
  return (
    <div className="statusDiv">
      <div className="slider-wrapper">
        <button id="prev-slide" className="slide-button text-white">
          <svg aria-label="Previous" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Previous</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path></svg>
        </button>
        <ul className="image-list">

          {storyArray.map((v, i) => (
            <Story key={i} isClick={true} />
          ))}


          {/* <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} />
          <Story isClick={true} /> */}

        </ul>
        <button id="next-slide" className="slide-button text-white">
          <svg aria-label="Next" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><title>Next</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414Z"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default AllStory