import React, { useState } from 'react';
import StoryViewSmall from '../components/StoryViewSmall';
import StoryView from '../components/StoryView';
import { useNavigate } from 'react-router-dom';
import { useNextStory } from '../contexts/nextStoryContext';
import { useNextStory2 } from '../contexts/nextStory2Context';
import { useStoryStartContext } from '../contexts/storyStartContext';
import { useStory } from '../contexts/storyContext';
import { useStoryUser } from '../contexts/storyUserContext';
import { useStoryUserCheck } from '../contexts/userStoryCheckContext';
import storyStore from '../store/storyStore';

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useNextStory2();
  const navigate = useNavigate()


  const [storiesAll, setStoriesAll] = useStory();
  const [userStoriesAll, setUserStoriesAll] = useStoryUser();
  const [userStoryCheck, setUserStoryCheck] = useStoryUserCheck();
  const allArchiveStory = storyStore((state) => state.allArchiveStory);
  const allHighLightedStory = storyStore((state) => state.allHighLightedStory);
  const stories = userStoryCheck == "userStories" ? [...userStoriesAll] || [] : userStoryCheck == "friendStories" ? [...storiesAll] || [] : userStoryCheck == "userArchive" ? [...allArchiveStory] || [] : userStoryCheck == "friendArchive" ? [...allHighLightedStory] || [] : [];

  const [isNextStory] = useNextStory(0)
  const [startingIndex, setStartingIndex] = useStoryStartContext()

  const handleNext = () => {
    const storyN = isNextStory + 1;
    if (storyN == stories?.[currentIndex].stories.length && currentIndex != stories.length - 1) {
      setCurrentIndex((v) => v + 1)
      setStartingIndex(0)
    } else {
      setStartingIndex(storyN)
    }
  };

  const handlePrevious = () => {
    const storyN = isNextStory - 1;
    if (storyN == -1 && currentIndex != 0) {
      setCurrentIndex((v) => v - 1)
      setStartingIndex(0)
    } else {
      setStartingIndex(storyN)
    }
  };

  // console.log("storiesAll", allArchiveStory)

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-800 fixed left-0 top-0 overflow-hidden">

      {stories.map((value, index) => {
        const position = index - currentIndex;

        if (position <= 2 && position >= -2) {

          let transformStyle = 'translateX(0) scale(1)';
          let opacity = 1;

          if (position === 0) {
            transformStyle = 'translateX(0) scale(1)';
          } else if (position < 0) {
            transformStyle = `translateX(calc(${position * 40}px)) scale(0.9)`;
            opacity = 0.7;
          } else {
            transformStyle = `translateX(calc(${position * 40}px)) scale(0.9)`;
            opacity = 0.7;
          }

          if (index == 0 && currentIndex == 0) {
            return (
              <>
                {stories.length != 1 && <><div
                  key={-2}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                </div>
                  <div
                    key={-1}
                    style={{
                      transform: transformStyle,
                      opacity,
                      transition: 'transform 0.5s ease, opacity 0.5s ease',
                    }}
                  >
                    <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                  </div></>}

                <div
                  key={0}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  {index === currentIndex ? <StoryView data={value} startIndex={startingIndex} /> : <StoryViewSmall data={value} userIndex={index} isEmpty={false} opacity={opacity * 100} />}
                </div>
              </>
            );
          }

          if (index == 0 && currentIndex == 1) {
            return (
              <>
                <div
                  key={-1}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                </div>

                <div
                  key={0}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  {index === currentIndex ? <StoryView data={value} startIndex={startingIndex} /> : <StoryViewSmall data={value} userIndex={index} isEmpty={false} opacity={opacity * 100} />}
                </div>
              </>
            );
          }

          if (index == stories.length - 1 && currentIndex == stories.length - 1) {
            return (
              <>
                <div
                  key={index}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  {index === currentIndex ? <StoryView data={value} startIndex={startingIndex} /> : <StoryViewSmall data={value} userIndex={index} isEmpty={false} opacity={opacity * 100} />}
                </div>
                <div
                  key={index + 1}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                </div>
                <div
                  key={index + 2}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                </div>
              </>
            );
          }

          if (index == stories.length - 1 && currentIndex == stories.length - 2) {
            return (
              <>
                <div
                  key={index}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  {index === currentIndex ? <StoryView data={value} startIndex={startingIndex} /> : <StoryViewSmall data={value} userIndex={index} isEmpty={false} opacity={opacity * 100} />}
                </div>
                <div
                  key={index + 1}
                  style={{
                    transform: transformStyle,
                    opacity,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <StoryViewSmall isEmpty={true} opacity={opacity * 100} />
                </div>
              </>
            );
          }

          return (
            <div
              key={index}
              style={{
                transform: transformStyle,
                opacity,
                transition: 'transform 0.5s ease, opacity 0.5s ease',
              }}
            >
              {index === currentIndex ? <StoryView data={value} startIndex={startingIndex} /> : <StoryViewSmall data={value} userIndex={index} isEmpty={false} opacity={opacity * 100} />}
            </div>
          );
        }
      })}

      <div className="logoDivStory absolute left-4 top-4">
        <i
          aria-label="Instagram"
          role="img"
          style={{
            backgroundImage: 'url(https://static.cdninstagram.com/rsrc.php/v4/yf/r/vI_SRjDNEcR.png)',
            backgroundPosition: '0px 0px',
            backgroundSize: 'auto',
            width: '103px',
            height: '29px',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
          }}
        ></i>
      </div>

      <div className="croseStoryDIv absolute top-4 right-4 text-white cursor-pointer" onClick={() => {
        setUserStoryCheck(false)
        navigate(-1)
      }}>
        <svg aria-label="Close" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
      </div>

      <div className="leftSwife text-white cursor-pointer absolute left-[33%] top-[50%]" onClick={handlePrevious}>
        <svg aria-label="Previous" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><title>Previous</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path></svg>
      </div>

      <div className="rightSwife text-white cursor-pointer absolute right-[33%] top-[50%]" onClick={handleNext}>
        <svg aria-label="Next" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><title>Next</title><path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414Z"></path></svg>
      </div>
    </div>
  );
}
