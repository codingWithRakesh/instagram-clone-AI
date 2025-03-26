import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlurBox from '../components/BlurBox';
import ShowPost from '../pages/ShowPost';

const PostShow = () => {
  
  return (
    <BlurBox>
      <ShowPost />
    </BlurBox>
  );
};

export default PostShow;
