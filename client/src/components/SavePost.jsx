import React, { useEffect } from 'react'
import SinglePost from './SinglePost'
import { handleError, handleSuccess } from './ErrorMessage'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedPosts } from '../redux/postSlice.js'
import DefaultBoxProfile from './DefaultBoxProfile.jsx'

const SavePost = () => {
    const { userSavedPosts } = useSelector(store => store.post);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSavePosts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/savePosts`,
                    {
                        withCredentials: true,
                    }
                );

                dispatch(setSavedPosts(response.data.data[0]));
                console.log("all save posts", response.data.data[0])
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
                handleError(error.response?.data?.message || error.message);
            }
        }
        fetchSavePosts()
    }, [])
    console.log("userSavedPosts", userSavedPosts)
    return (
        <div id="postContentId" className=" displayFlex">
            {userSavedPosts.savedposts.length ? (userSavedPosts.savedposts.map((v, i) => (
                <SinglePost key={i} values={v} />
            )))
            :
            <DefaultBoxProfile name="saved" />}
        </div>
    )
}

export default SavePost