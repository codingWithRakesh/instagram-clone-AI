import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const messageStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    newMessage : null,
    allMessage : null,
    socket : null,
    onlineUsers : [],
    setOnlineUsers : (users) => {
        set({ onlineUsers: users })
    },
    setSocket : (value) => {
        set({socket : value})
    },
    setNewMessage : async (id, messages) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_MESSAGE}/sendMessage/${id}`,
                { textMessage: messages },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, newMessage: response.data });
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    setAllMessage : async (id,setMessagesChat) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_MESSAGE}/getMessages/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allMessage: response.data.data[0] });
                setMessagesChat((response.data?.data?.[0]?.messages || []).slice().reverse());
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    },
    getAllMessageUsers : async (setChatList) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_MESSAGE}/getMessageUsers`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                console.log("getAllMessageUsers",response.data.data || [])
                setChatList((prv) => {
                    const existingIds = new Set(prv.map((item) => item._id)); // assuming _id is the unique identifier
                    const newItems = response.data.data.filter(
                        (item) => !existingIds.has(item._id)
                    );
                    return [...prv, ...newItems];
                });
                handleSuccess(response.data.message);
            }
            // console.log("fetchPost end");
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error
        }
    }
}))

export {messageStore}