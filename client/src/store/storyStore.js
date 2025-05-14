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
    allStorys : null,
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
                console.log("response.data.storys", response.data.data[0].followusers);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        } finally {
            set({ isLoading: false });
        }
    },
    userStorys : async (userName, setUserStoriesAll) => {
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
                console.log("userStory : ", response.data.data);
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

    storyViewedUser : async (storyId) => {
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
                console.log("userStory view : ", response.data.data);
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