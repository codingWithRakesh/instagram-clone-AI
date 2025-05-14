import React, { useState, useRef } from 'react';
import Stories from 'react-insta-stories';
import profile from '../assets/images/profile.jpeg';
// import { stories, userStory } from '../constants/constant.js';
import { MdMusicNote } from "react-icons/md";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useNextStory } from '../contexts/nextStoryContext.jsx';
import { useNextStory2 } from '../contexts/nextStory2Context.jsx';
import { useStoryStartContext } from '../contexts/storyStartContext.jsx';
import noProfile from "../assets/images/profileNot.jpg"
import { NavLink, useNavigate } from 'react-router-dom';
import TimeAgo from './TimeAgo.jsx';
import { messageStore } from '../store/messageStore.js';
import { useCallback } from 'react';
import { handleSuccess } from './ErrorMessage.jsx';
import { useStory } from '../contexts/storyContext.jsx';
import storyStore from '../store/storyStore.js';

const StoryView = ({ startIndex, data }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const storiesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useNextStory2();
  const navigate = useNavigate();
  const [isAllData, setIsAllData] = useState({});
  const [messageValue, setMessageValue] = useState('');
  const setNewMessage = messageStore((state) => state.setNewMessage);
  const [storiesAll, setStoriesAll] = useStory();
  const storyViewedUser = storyStore((state) => state.storyViewedUser);

  // console.log("data check in view", data);

  const sendData = async () => {
    if (messageValue.trim() === '') return;
    await setNewMessage(data?.following, messageValue);
    console.log("data?._id, messageValue", data?.following, messageValue);
    handleSuccess("Message sent successfully");
    setMessageValue('');
  };

  const [isNextStory, setIsNextStory] = useNextStory()
  const [startingIndex, setStartingIndex] = useStoryStartContext()

  const handlePausePlay = () => {
    setIsPaused(prev => !prev);
  };

  const handleMuteUnmute = () => {
    setIsMuted((prev) => !prev);
  };

  const currentStoryIndex = startIndex

  return (
    <div className='h-[96vh] relative w-[450px] flex flex-col justify-center items-center rounded-[5px] overflow-hidden'>
      <Stories
        ref={storiesRef}
        stories={data.stories}
        defaultInterval={5000}
        width={450}
        height={"96vh"}
        currentIndex={currentStoryIndex}
        keyboardNavigation={true}
        isPaused={isPaused}
        onStoryStart={(index) => {
          setIsNextStory(index)
          console.log('Story started', data.stories[index]._id);
          setIsAllData(data.stories[index]);
          navigate(`/stories/${data?.userName}/${data.stories[index]._id}`, { replace: true });
          storyViewedUser(data.stories[index]._id);
        }}
        onStoryEnd={(index) => {
          if (index + 1 == data.stories.length && currentIndex + 1 != storiesAll.length) {
            setCurrentIndex((v) => v + 1)
            setStartingIndex(0)
          }
        }}
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
      <div className="profileDivMuteUn paddingLER w-full h-[2.5rem] absolute left-0 top-[1.6rem] z-[9999] text-white flex items-center justify-between">
        <div className="profilelS h-full flex flex-1 items-center justify-start gap-2 px-2">
          <NavLink to={`/${data?.userName}`} className="imgDicjj w-8 h-8 rounded-full overflow-hidden">
            <img src={data?.profilePic || noProfile} className='w-full h-full object-cover' />
          </NavLink>
          <div className="writeALl flex flex-col justify-center items-start leading-[18px]">
            <div className='flex gap-2'>
              <NavLink to={`/${data?.userName}`} className='text-[14px]'>{data?.userName}</NavLink>
              <p><TimeAgo date={isAllData?.createdAt} /></p>
            </div>
            {isAllData.type == "video" && <div className='flex items-center justify-center gap-1'>
              <span>
                <MdMusicNote />
              </span>
              Music
            </div>}
          </div>
        </div>
        <div className="controlsR flex gap-4 text-[20px]">
          {isAllData.type == "video" && <div onClick={handleMuteUnmute} className='cursor-pointer'>
            {isMuted ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
          </div>}

          <div onClick={handlePausePlay} className='cursor-pointer'>
            {isPaused ? <TbPlayerPlayFilled /> : <TbPlayerPauseFilled />}
          </div>
        </div>
      </div>
      <div className="commentDiv w-full h-[3.375rem] text-white paddingLER flex items-center justify-between absolute left-0 bottom-6 z-[9999]">
        <div className="inputDivStory h-[2.8rem] rounded-3xl paddinInputStory flex flex-1 border border-white">
          <input type="text" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder='Add a comment...' className='w-full h-full bg-transparent text-white outline-none px-2' />
          <button onClick={sendData} className='cursor-pointer'>Send</button>
        </div>
        <div onClick={() => setIsLike((v) => !v)} className="storyLike h-[2.5rem] w-[2.5rem] cursor-pointer text-2xl flex items-center justify-center">
          {!isLike ? <FaRegHeart /> : <FaHeart />}
        </div>
      </div>
    </div>
  );
};

export default StoryView;