import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const postStore = create((set) => ({
    showPost: null,
    isLoading: false,
    error: null,
    message: null,
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
    likePost : async (pId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_LIKE}/toggleLikePost`,
                {postId : pId},
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
    }

}));

export { postStore }