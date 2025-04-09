import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import axios from 'axios'
import { handleError, handleSuccess } from './ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../redux/postSlice.js'
import { useParams } from 'react-router-dom'
import DefaultBoxProfile from './DefaultBoxProfile'
import { postStore } from '../store/postStore.js'

const PostsProfile = () => {
    // const { userPosts } = useSelector(store => store.post);
    const {profile} = useParams()
    // console.log("profile",profile)
    const fetchPosts = postStore((state) => state.fetchPosts);
    const userPosts = postStore((state) => state.userPosts);
    useEffect(() => {
        fetchPosts(profile)
    }, [profile])

    // console.log("userPosts", userPosts.posts != undefined && userPosts.posts?.length)

    return (
        <div id="postContentId" className=" displayFlex">
            {userPosts?.posts && userPosts?.posts?.length ? (userPosts?.posts?.map((v,i)=>(
                <SinglePost key={i} values={v}/>
            )))
            :
            <DefaultBoxProfile name="photo" />}
            {/* <DefaultBoxProfile name="photo" /> */}
        </div>
    )
}

export default PostsProfile