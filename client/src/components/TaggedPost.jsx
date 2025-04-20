import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleError, handleSuccess } from './ErrorMessage';
import { setTaggedPosts } from '../redux/postSlice.js';
import axios from 'axios';
import DefaultBoxProfile from './DefaultBoxProfile.jsx';

const TaggedPost = () => {
    const [userTaggedPosts, seUserTaggedPosts] = useState("")
    const { profile } = useParams()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/tagged/${profile}`,
                    {
                        withCredentials: true,
                    }
                );

                seUserTaggedPosts(response.data.data[0])
                // console.log("all tagged", response.data.data[0])
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
                handleError(error.response?.data?.message || error.message);
            }
        }
        fetchPosts()
    }, [])

    // console.log("userTaggedPosts", userTaggedPosts?.taggedPosts)
    return (
        <div id="postContentId" className=" displayFlex">
            {userTaggedPosts?.taggedPosts?.length ? (userTaggedPosts?.taggedPosts?.map((v, i) => (
                <SinglePost key={i} values={v} />
            )))
            :
            <DefaultBoxProfile name="tagged" />
            }
        </div>
    )
}

export default TaggedPost