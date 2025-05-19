import React, { useState, useRef, useEffect } from 'react';
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
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import TimeAgo from './TimeAgo.jsx';
import { messageStore } from '../store/messageStore.js';
import { useCallback } from 'react';
import { handleSuccess } from './ErrorMessage.jsx';
import { useStory } from '../contexts/storyContext.jsx';
import storyStore from '../store/storyStore.js';
import { BsThreeDots } from "react-icons/bs";
import LikeShowStory from './LikeShowStory.jsx';
import { useStoryUserCheck } from '../contexts/userStoryCheckContext.jsx';
import { useControl } from '../contexts/controlContext.jsx';
import { useAuthStore } from '../store/authStore.js';

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
  const setShowStory = storyStore((state) => state.setShowStory);
  const showStory = storyStore((state) => state.showStory);
  const [isClickSeenStory, setIsClickSeenStory] = useState(false);
  const [userStoryCheck, setUserStoryCheck] = useStoryUserCheck();
  const user = useAuthStore((state) => state.user);
  const value = useParams();
  const doUnHighLightStory = storyStore((state) => state.doUnHighLightStory);

  const deleteStory = storyStore((state) => state.deleteStory);
  const likeStory = storyStore((state) => state.likeStory);
  const [control, setControl] = useControl();

  const commentControl = {
    isOn: true,
    data: [
      {
        name: "Delete",
        action: async () => {
          await deleteStory(value.storyId);
          await navigate(-1);
          await setControl(v => !v);
        },
        colorC: "ED4956"
      },
      {
        name: "Cancel",
        action: () => {
          setControl(v => !v);
          setIsPaused(prev => !prev);
        },
        colorC: "000"
      }
    ]
  }

  const commentControlUN = {
    isOn: true,
    data: [
      {
        name: "Delete",
        action: async () => {
          await deleteStory(value.storyId);
          await navigate(-1);
          await setControl(v => !v);
        },
        colorC: "ED4956"
      },
      {
        name: "Un Highlight",
        action: async () => {
          await doUnHighLightStory(value.storyId);
          await navigate(-1);
          await setControl(v => !v);
        },
        colorC: "ED4956"
      },
      {
        name: "Cancel",
        action: () => {
          setControl(v => !v)
          setIsPaused(prev => !prev)
        },
        colorC: "000"
      }
    ]
  }

  useEffect(() => {
    if (userStoryCheck == "userStories") {
      setShowStory(value.storyId);
    }

  }, []);

  // console.log("data check in view", data);

  const sendData = async () => {
    if (messageValue.trim() === '') return;
    await setNewMessage(data?.following, messageValue);
    // console.log("data?._id, messageValue", data?.following, messageValue);
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

  const currentStoryIndex = startIndex;

  const likeStoryFun = async () => {
    setIsLike((v) => !v)
    await likeStory(value.storyId);
  }

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
          // console.log('Story started', data.stories[index]._id);
          setIsAllData(data.stories[index]);
          navigate(`/stories/${data?.userName}/${data.stories[index]._id}`, { replace: true });
          if (userStoryCheck == "friendStories") {
            setIsLike(data.stories[index].isLiked)
            storyViewedUser(data.stories[index]._id);
          }
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
        <div className="controlsR flex items-center justify-center gap-4 text-[20px]">
          {isAllData.type == "video" && <div onClick={handleMuteUnmute} className='cursor-pointer'>
            {isMuted ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
          </div>}

          <div onClick={handlePausePlay} className='cursor-pointer'>
            {isPaused ? <TbPlayerPlayFilled /> : <TbPlayerPauseFilled />}
          </div>

          {user.userName == data?.userName && <div className='cursor-pointer text-2xl flex items-center justify-center' onClick={() => {
            setControl(userStoryCheck == "friendArchive" ? commentControlUN : commentControl)
            setIsPaused(prev => !prev)
          }}>
            <BsThreeDots />
          </div>}
        </div>
      </div>
      {isClickSeenStory && <LikeShowStory setIsClickSeenStory={setIsClickSeenStory} setIsPaused={setIsPaused} />}
      {(userStoryCheck == "userStories" || userStoryCheck == "friendStories") && <div className="commentDiv w-full h-[3.375rem] text-white paddingLER flex items-center justify-between absolute left-0 bottom-6 z-[9999]">
        {userStoryCheck == "userStories" ? <>
          <button onClick={() => {
            setIsClickSeenStory((v) => !v)
            setIsPaused(prev => !prev)
            }} type="button" className="text-gray-900 text-[17px] cursor-pointer bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg custom-button dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">seen by {showStory?.viewsCount}</button>
        </>
          :
          <>
            <div className="inputDivStory h-[2.8rem] rounded-3xl paddinInputStory flex flex-1 border border-white">
              <input type="text" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder='Add a comment...' className='w-full h-full bg-transparent text-white outline-none px-2' />
              <button onClick={sendData} className='cursor-pointer'>Send</button>
            </div>
            <div onClick={likeStoryFun} className="storyLike h-[2.5rem] w-[2.5rem] cursor-pointer text-2xl flex items-center justify-center">
              {!isLike ? <svg aria-label="Like" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg> : <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8 text-red-600" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}
            </div>
          </>}
      </div>}
    </div>
  );
};

export default StoryView;