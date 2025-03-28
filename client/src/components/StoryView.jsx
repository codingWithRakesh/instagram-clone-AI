import React, { useState, useRef } from 'react';
import Stories from 'react-insta-stories';
import profile from '../assets/images/profile.jpeg';
import video from '../assets/videos/videoMin.mp4';
import { stories } from '../constants/constant.js';

const StoriesAll = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const storiesRef = useRef(null);

  const handlePausePlay = () => {
    // Simply toggle the paused state - the Stories component will handle the rest
    setIsPaused(prev => !prev);
  };

  const handleMuteUnmute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div>
      <h1>Instagram Stories with Controls</h1>
      <Stories
        ref={storiesRef}
        stories={stories}
        defaultInterval={5000}
        width={350}
        height={600}
        loop={true}
        keyboardNavigation={true}
        isPaused={isPaused}  // This prop controls the pause/play state
        onStoryStart={() => console.log('Story started')}
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
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePausePlay}>{isPaused ? '▶ Play' : '⏸ Pause'}</button>
        <button onClick={handleMuteUnmute}>{isMuted ? '🔊 Unmute' : '🔇 Mute'}</button>
      </div>
    </div>
  );
};

export default StoriesAll;