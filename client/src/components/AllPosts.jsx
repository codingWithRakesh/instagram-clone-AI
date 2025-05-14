import React from 'react'
import Post from './Post'
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import { postStore } from '../store/postStore';
import { useState } from 'react';

const AllPosts = () => {
  const [AllPosts, setAllPosts] = useState([]);
  const allPostsHome = postStore((state) => state.allPostsHome);
  useEffect(() => {
    allPostsHome(setAllPosts);
  }, [allPostsHome]);

  return (
    <div className="postBox">

      {
        AllPosts?.length > 0 ? AllPosts?.map((value, index) => {
          return (
            <Post key={index} value={value} />
          )
        }) : <div className='text-center text-2xl font-bold'>No Post</div>
      }

    </div>
  )
}

export default AllPosts