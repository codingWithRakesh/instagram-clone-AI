import React, { use, useEffect, useRef, useState } from 'react'
import Story from './Story'
import storyStore from '../store/storyStore';
import { useStory } from '../contexts/storyContext';
import { useAuthStore } from '../store/authStore';
import { useStoryUser } from '../contexts/storyUserContext';

const AllStory = () => {
  const setAllStorys = storyStore((state) => state.setAllStorys);
  const userStorys = storyStore((state) => state.userStorys);
  const [storiesAll, setStoriesAll] = useStory();
  const user = useAuthStore((state) => state.user);
  const storyArray = [...storiesAll] || [];
  const [userStoriesAll, setUserStoriesAll] = useStoryUser();

  const containerStores = useRef(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const checkScrollPosition = () => {
    if (containerStores.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerStores.current;
      setShowPrevButton(scrollLeft > 0);
      setShowNextButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    setAllStorys(setStoriesAll);
    userStorys(user.userName,setUserStoriesAll);
    checkScrollPosition();
    // Add event listener for scroll
    const container = containerStores.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const handleNext = () => {
    if (containerStores.current) {
      containerStores.current.scrollTo({
        left: containerStores.current.scrollLeft + 325,
        behavior: 'smooth'
      });
    }
  }

  const handlePrevious = () => {
    if (containerStores.current) {
      containerStores.current.scrollTo({
        left: containerStores.current.scrollLeft - 325,
        behavior: 'smooth'
      });
    }
  }

  // console.log('Story Array:', storyArray.length);
  return (
    <div className="statusDiv">
      <div className="slider-wrapper">
        {showPrevButton && <button id="prev-slide" className="slide-button text-white" onClick={handlePrevious}>
          <svg aria-label="Previous" className="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Previous</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path></svg>
        </button>}
        <ul ref={containerStores} className="image-list" style={{
            scrollBehavior: 'smooth'
          }}>
          
          <Story value={userStoriesAll?.[0]} isClick={true} isUser={true} />
          {storyArray.map((v, i) => (
            <Story key={i} index={i} isClick={true} value={v} isUser={false} />
          ))}

        </ul>
        {showNextButton && <button id="next-slide" className="slide-button text-white" onClick={handleNext}>
          <svg aria-label="Next" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><title>Next</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414Z"></path></svg>
        </button>}
      </div>
    </div>
  )
}

export default AllStory