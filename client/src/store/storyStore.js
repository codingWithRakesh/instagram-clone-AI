import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const storyStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    uploadStory: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/createStory`,
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
            set({ isLoading: false });
        }
    },
    allStorys: null,
    setAllStorys: async (setStoriesAll) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/allStories`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allStorys: response.data.data[0].followusers });
                setStoriesAll(response.data.data[0].followusers);
                // console.log("response.data.storys", response.data.data[0].followusers);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },
    userStorys: async (userName, setUserStoriesAll) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/viewStory/${userName}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("userStory : ", response.data.data);
                setUserStoriesAll(response.data.data);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },

    storyViewedUser: async (storyId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/storyViewers/${storyId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("userStory view : ", response.data.data);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },
    showStory: null,
    setShowStory: async (storyId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/storyViewClient/${storyId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, showStory: response.data.data[0].stories[0] });
                // console.log("userStory view show : ", response.data.data[0].stories[0]);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },

    deleteStory: async (storyId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/deleteStory/${storyId}`,
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
            set({ isLoading: false });
        }
    },

    likeStory: async (storyId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_LIKE}/toggleLikeStory/${storyId}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },

    allArchiveStory: null,
    setAllArchiveStory: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/allArchiveStory`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Get the stories array
                const { fullName, userName, profilePic, _id } = response.data.data[0];
                const stories = response.data.data[0].stories;
                const transformedStories = stories.map(story => ({ fullName, userName, profilePic, _id, stories: [story] }));

                set({
                    isLoading: false,
                    allArchiveStory: transformedStories
                });
                // console.log("allArchiveStory : ", transformedStories);
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    allHighLightedStory : null,
    setAllHighLightedStory: async (userName) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/allHighLightedStory/${userName}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Get the stories array
                const { fullName, userName, profilePic, _id } = response.data.data[0];
                const stories = response.data.data[0].stories;
                const transformedStories = stories.map(story => ({ fullName, userName, profilePic, _id, stories: [story] }));

                set({
                    isLoading: false,
                    allHighLightedStory: transformedStories
                });
                // console.log("allHighLightedStory : ", transformedStories);
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    allUnHighLightedStory: null,
    setAllUnHighLightedStory: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/allUnHighLightedStory`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Get the stories array
                const { fullName, userName, profilePic, _id } = response.data.data[0];
                const stories = response.data.data[0].stories;
                const transformedStories = stories.map(story => ({ fullName, userName, profilePic, _id, stories: [story] }));

                set({
                    isLoading: false,
                    allUnHighLightedStory: transformedStories
                });
                // console.log("allUnHighLightedStory : ", transformedStories);
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    doHighLightStory : async (data) => {
        // console.log("data in doHighLightStory", data);
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/doHighLightStory/${data.storyId}`,
                {
                    "title": data.name,
                },
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
        } finally {
            set({ isLoading: false });
        }
    },

    doUnHighLightStory : async (storyId) => {
        // console.log("data in doUnHighLightStory", storyId);
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_STORY}/doUnHighLightStory/${storyId}`,
                null,
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
            set({ isLoading: false });
        }
    }
}));

export default storyStore;