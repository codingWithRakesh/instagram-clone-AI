import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const notificationStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    allNotification : [],
    fetchAllNotification : async (setNotificationAll) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_NOTIFICATION}/allNotification`,
                {
                    withCredentials: true,
                }
            );
        
            if (response.status === 200) {
                set({ isLoading: false, allNotification: response.data.data[0] });
                setNotificationAll(response.data.data[0]?.notifications)
                handleSuccess(response.data.message);
            }
            // console.log("all posts",response.data.data[0])
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    }
}))

export {notificationStore}