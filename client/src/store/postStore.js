import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const postStore = create((set) => ({
    showPost: null,
    isLoading: false,
    error: null,
    message: null,
    userPosts : null,
    editPostValue : null,
    fetchPost: async (pId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/viewPost/${pId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, showPost: response.data.data[0] });
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    fetchPostForEdit : async (pId, setEditPostValue) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/editPostData`,
                {postId : pId},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, editPostValue: response.data.data[0] });
                setEditPostValue(response.data.data[0])
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    submitEditPost : async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/updatePost`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    uploadPost: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/createPost`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false});
        }
    },
    likePost : async (pId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_LIKE}/toggleLikePost`,
                {postId : pId},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    likeComment : async (cId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_LIKE}/toggleLikeComment`,
                {commentId : cId},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    savePost : async (pId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_SAVE}/saveUnsavePost`,
                {postId : pId},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    uploadComment : async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_COMMENT}/addCommentPost`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    deleteComment: async (cId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_COMMENT}/deleteComment`,
                {
                    data: { id: cId },
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    deletePost: async (pId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/deletePost`,
                {   
                    data: { postId: pId },
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    fetchPosts : async (profile) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/allUserPosts/${profile}`,
                {
                    withCredentials: true,
                }
            );
        
            if (response.status === 200) {
                set({ isLoading: false, userPosts: response.data.data[0] });
                handleSuccess(response.data.message);
            }
            // console.log("all posts",response.data.data[0])
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    fetchAllPostSExplore: async (setExploreValues) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/allPostExplore`,
                {
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
    
                const allPosts = response.data.data;
    
                // Split the array into chunks of 5
                const chunkedPosts = [];
                for (let i = 0; i < allPosts.length; i += 5) {
                    chunkedPosts.push(allPosts.slice(i, i + 5));
                }
    
                // Set the chunked array to state
                setExploreValues(chunkedPosts);
    
                // console.log("Chunked posts:", chunkedPosts);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    allReelsPage : [],
    setAllReelsPage : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/allReelsPage`,
                {
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("allReelsPage",response.data.data)
                set({ allReelsPage: response.data.data });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    allReelComment : async (rId, setReelComments) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/commentOnReel/${rId}`,
                {
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("allReelComment",response.data.data)
                setReelComments(response.data.data)
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    allReelLike : async (rId, setAllReelsLikeArray) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/reelPostLike/${rId}`,
                {
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
                // console.log("allReelLike",response.data.data?.[0])
                setAllReelsLikeArray(response.data.data?.[0])
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    allReelSave : async (rId, setIsSaveReel) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/reelSavePost/${rId}`,
                {
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
                // console.log("allReelSave",response.data.data?.[0]?.savedPosts)
                setIsSaveReel(response.data.data?.[0]?.savedPosts)
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    allPostsHome: async (setAllPosts) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/allPosts`,
            {
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            set({ isLoading: false });
            
            // Extract the main posts array
            const mainPosts = response.data.data[0].posts || [];
            
            // Extract posts from followusers
            const followUsersPosts = response.data.data[0].followusers.flatMap(followUser => {
                // Each followUser has a user array with one object
                const user = followUser.user[0];
                return user.posts || []; // Return posts if they exist, otherwise empty array
            });
            
            // Combine all posts
            const allPosts = [...mainPosts, ...followUsersPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            setAllPosts(allPosts);
            handleSuccess(response.data.message);
            console.log("Combined posts:", allPosts);
        }
    } catch (error) {
        handleError(error.response?.data?.message || error.message);
        set({ isLoading: false, error: error.message });
        throw error;
    }
},

}));

export { postStore }