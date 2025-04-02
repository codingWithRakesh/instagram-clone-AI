import React, { useEffect } from 'react'
import SinglePost from './SinglePost'
import axios from 'axios'
import { handleError, handleSuccess } from './ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../redux/postSlice.js'
import { useParams } from 'react-router-dom'
import DefaultBoxProfile from './DefaultBoxProfile.jsx'

const PostsProfile = () => {
    const { userPosts } = useSelector(store => store.post);
    const dispatch = useDispatch()
    const {profile} = useParams()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/allUserPosts/${profile}`,
                    {
                        withCredentials: true,
                    }
                ); 

                dispatch(setPosts(response.data.data[0]));
                console.log("all posts",response.data.data[0])
                handleSuccess(response.data.message);
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
                handleError(error.response?.data?.message || error.message);
            }
        }
        fetchPosts()
    }, [])

    console.log("userPosts",userPosts.posts.length ? true : false)

    return (
        <div id="postContentId" className=" displayFlex">
            {userPosts.posts.length ? (userPosts.posts.map((v,i)=>(
                <SinglePost key={i} values={v}/>
            )))
            :
            <DefaultBoxProfile name="photo" />}
        </div>
    )
}

export default PostsProfile