import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    selectedUser: null,
    allFollowersUser : null,

    fetchAuth: async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/currentUser`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ user: response.data.data, isAuthenticated: true });
                // console.log("from store", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            // handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },

    setAllFollowersUser : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/allFollowers`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ allFollowersUser: response?.data?.data?.followersCounts?.map(v => v?.allUserFollower?.[0]), isLoading: false });
                // console.log("from store", response.data.data.followersCounts.map(v => v.allUserFollower[0]));
                // handleSuccess(response.data.message);
            } else {
                set({ allFollowersUser: null, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false });
            handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },

    signUp: async (updatedDetails) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/register`,
                updatedDetails,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                });

                // console.log("from store", response.data);
                handleSuccess("OTP send Successfully");
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
            // console.log('User Data:', response.data, response.data.message);
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    otpSubmit: async (otp, navigate) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/verfiyEmail`,
                { otp },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({
                    user: response.data.data.user,
                    isAuthenticated: true,
                    isLoading: false
                });

                // console.log("from store", response.data.data);
                handleSuccess(response.data.message);
                navigate("/");
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }

        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    logIn: async (data, setIsSwitch, setMore, navigate) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/login`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({
                    user: response.data.data.user,
                    isAuthenticated: true,
                    isLoading: false
                });

                // console.log("from store", response.data.data)
                handleSuccess(response.data.message);
                navigate("/");
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            set({ isLoading: false });
            setMore(false)
            setIsSwitch(false)
        }
    },

    logInFacebook: async (userData, setIsSwitch, setMore, navigate) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/login`,
                userData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({
                    user: response.data.data.user,
                    isAuthenticated: true,
                    isLoading: false
                });

                // console.log("from store", response.data.data);
                handleSuccess(response.data.message);
                navigate("/");
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }

        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            set({ isLoading: false });
            setMore(false)
            setIsSwitch(false)
        }
    },

    logOut: async (navigate) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/logout`,
                {
                    withCredentials: true,
                }
            );

            set({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });

            handleSuccess(response.data.message);
            navigate("/accounts/login");
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },

    fetchSelectedUser: async (profile) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/userProfile/${profile}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({
                    selectedUser: response.data.data,
                    isLoading: false
                });

                // console.log("from store", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ selectedUser: null, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },

    uploadProfileImage: async (formData, setImageSrc, selectedFile) => {
        set({ isLoading: true, error: null });
        setImageSrc(URL.createObjectURL(selectedFile));
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/updateProfileImage`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("from store", response.data.data);
                handleSuccess(response.data.message);
            } else {
                set({ isLoading: false });
            }

        } catch (error) {
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    uploadProfileDetails: async (updateProfile) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/updateProfile`,
                updateProfile,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({
                    user: response.data.data,
                    isLoading: false
                });

                // console.log("response.data", response.data.data)
                handleSuccess(response.data.message);
            } else {
                set({ isLoading: false });
            }

        } catch (error) {
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
        // console.log(updateProfile)
    },

    deleteProfileImage: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/deleteProfileImage`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                // console.log("from store", response.data.data);
                handleSuccess(response.data.message);
            } else {
                set({ isLoading: false });
            }

        } catch (error) {
            // console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },

    followUnFollow : async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_FOLLOW}/followUnfollow`,
                { userId: userId },
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
            throw error;
        }
    },

    searchUser : async (searchValue,setShowSearch) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/searchUser`,
                { searchValue: searchValue },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                set({ isLoading: false });
                setShowSearch(response.data.data)
                // console.log("from store", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ isLoading: false });
            }

        } catch (error) {
            // handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    allSuggestedUser : [],
    setAllSuggestedUser : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/suggestedUsers`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, allSuggestedUser: response.data.data });
                // console.log("from store allSuggestedUser", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ isLoading: false });
            }

        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    }
}));

export { useAuthStore };
