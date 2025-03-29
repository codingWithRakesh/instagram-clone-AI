import React, { useState, useRef } from 'react';
import Stories from 'react-insta-stories';
import profile from '../assets/images/profile.jpeg';
import { stories } from '../constants/constant.js';
import { MdMusicNote } from "react-icons/md";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useNextStory } from '../contexts/nextStoryContext.jsx';

const StoryView = ({startIndex}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLike, setIsLike] = useState(false)
  const storiesRef = useRef(null);

  const [isNextStory, setIsNextStory] = useNextStory()

  const handlePausePlay = () => {
    setIsPaused(prev => !prev);
  };

  const handleMuteUnmute = () => {
    setIsMuted((prev) => !prev);
  };

  const startingIndex = startIndex

  return (
    <div className='h-[96vh] relative w-[350px] flex flex-col justify-center items-center rounded-[5px] overflow-hidden'>
      <Stories
        ref={storiesRef}
        stories={stories}
        defaultInterval={5000}
        width={350}
        height={"96vh"}
        currentIndex={startingIndex}
        keyboardNavigation={true}
        isPaused={isPaused} 
        onStoryStart={(index) => {
          setIsNextStory(index)
          console.log('Story started')
        }}
        onStoryEnd={(index) => console.log(`Story ${index + 1} finished`)}
        storyContent={(story) => {
          if (story.type === 'video') {
            return (
              <video
                src={story.url}
                autoPlay
                muted={isMuted}
                style={{ width: '100%', height: '100%' }}
              />
            );
          }
          return <img src={story.url} alt="story" style={{ width: '100%', height: '100%' }} />;
        }}
      />
      <div className="profileDivMuteUn paddingLER w-full h-[2.5rem] absolute left-0 top-6 z-[9999] text-white flex items-center justify-between">
        <div className="profilelS h-full flex flex-1 items-center justify-start gap-2 px-2">
          <div className="imgDicjj w-8 h-8 rounded-full overflow-hidden">
            <img src={profile} className='w-full h-full object-cover' />
          </div>
          <div className="writeALl flex flex-col justify-center items-start leading-[18px]">
            <div className='flex gap-2'>
              <p className='text-[14px]'>CodeWithRakesh</p>
              <p>5h</p>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <span>
                <MdMusicNote />
              </span>
              Music
            </div>
          </div>
        </div>
        <div className="controlsR flex gap-4 text-[20px]">
          <div onClick={handleMuteUnmute} className='cursor-pointer'>
            {isMuted ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
          </div>

          <div onClick={handlePausePlay} className='cursor-pointer'>
            {isPaused ? <TbPlayerPlayFilled /> : <TbPlayerPauseFilled />}
          </div>
        </div>
      </div>
      <div className="commentDiv w-full h-[3.375rem] text-white paddingLER flex items-center justify-between absolute left-0 bottom-6 z-[9999]">
        <div className="inputDivStory h-[2.8rem] rounded-3xl paddinInputStory flex flex-1 border border-white">
          <input type="text" placeholder='Add a comment...' className='w-full h-full bg-transparent text-white outline-none px-2' />
          <button className='cursor-pointer'>Send</button>
        </div>
        <div onClick={()=>setIsLike((v) =>!v)} className="storyLike h-[2.5rem] w-[2.5rem] cursor-pointer text-2xl flex items-center justify-center">
          {!isLike ? <FaRegHeart /> : <FaHeart/>}
        </div>
      </div>
    </div>
  );
};

export default StoryView;